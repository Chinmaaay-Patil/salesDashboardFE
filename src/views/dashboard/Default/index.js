import { useEffect, useState } from 'react';
import axios from 'axios';
// material-ui
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';

import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { useNavigate } from 'react-router';
import DateComponent from 'ui-component/DatePicker';
import { getTodayDate } from 'utils/getTodaysDate';
import commonAPI from 'utils/axiosConfig';
import { fetchSalesDashboardData } from 'utils/fetchSalesDashboardData';
import { getSalesPersonList } from 'utils/apiCalls/getSalesPersonList';
import { SalesPerson } from 'constants/salesPerson';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    }

    const data = getSalesPersonList();

    console.log('res', data);
  }, []);

  const [salesDashboardDataDates, setSalesDashboardDataDates] = useState({
    fromDate: getTodayDate(),
    toDate: getTodayDate(),
    salesPersonId: -1
  });

  const [salesDashboardData, setSalesDashboardData] = useState([]);
  const [donoutChartData, setDonoutChartData] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState([]);

  useEffect(async () => {
    const fetDashboardData = await fetchSalesDashboardData(
      salesDashboardDataDates.fromDate,
      salesDashboardDataDates.toDate,
      salesDashboardDataDates.salesPersonId
    );

    setDonoutChartData(fetDashboardData.DonoutChartData);
    setStackedBarChartData(fetDashboardData.StackedBarChartData);
    setSalesDashboardData(fetDashboardData.SalesDashboardData);
  }, []); // Empty dependency

  async function handleFilterOptionsChange() {
    const fetDashboardData = await fetchSalesDashboardData(
      salesDashboardDataDates.fromDate,
      salesDashboardDataDates.toDate,
      salesDashboardDataDates.salesPersonId
    );

    setDonoutChartData(fetDashboardData.DonoutChartData);
    setStackedBarChartData(fetDashboardData.StackedBarChartData);
    setSalesDashboardData(fetDashboardData.SalesDashboardData);
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 2 }}>Filters :</Typography>
        <Grid container spacing={gridSpacing} sx={{ pb: 2 }}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <DateComponent
              label="From Date"
              value={salesDashboardDataDates.fromDate}
              onChange={(e) => setSalesDashboardDataDates({ ...salesDashboardDataDates, fromDate: e.target.value })}
            />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <DateComponent
              label="To Date"
              value={salesDashboardDataDates.toDate}
              onChange={(e) => setSalesDashboardDataDates({ ...salesDashboardDataDates, toDate: e.target.value })}
            />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Autocomplete
              onChange={(event, newValue) => {
                setSalesDashboardDataDates({ ...salesDashboardDataDates, salesPersonId: newValue.sid });
              }}
              disablePortal
              id="combo-box-demo"
              size="small"
              sx={{ width: '100%' }}
              options={SalesPerson}
              getOptionLabel={(option) => option.salesPersonName}
              renderInput={(params) => <TextField {...params} label="Sales Person" />}
            />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                borderRadius: 3
              }}
              onClick={handleFilterOptionsChange}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing}>
          {salesDashboardData.map((cardData, index) => {
            return (
              <Grid key={index} item lg={3} md={6} sm={6} xs={12}>
                <EarningCard isLoading={isLoading} cardData={cardData} />
              </Grid>
            );
          })}

          {/* <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} xs={12} md={8}>
            <PopularCard isLoading={isLoading} donoutChartData={donoutChartData} setDonoutChartData={setDonoutChartData} />
          </Grid>{' '}
          <Grid item lg={6} xs={12} md={4}>
            <TotalGrowthBarChart
              isLoading={isLoading}
              stackedBarChartData={stackedBarChartData}
              setStackedBarChartData={setStackedBarChartData}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
