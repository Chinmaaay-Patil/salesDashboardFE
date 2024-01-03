import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import DonutChartsCustom from '../Donout';
import { calculateDateRange } from 'utils/calculateDateRangeFilterDates';
import { fetchSalesDashboardData } from 'utils/fetchSalesDashboardData';
import NoDataDisplay from 'utils/NoDataDisplay';

const status = [
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'threeMonth',
    label: 'Three Months'
  },
  {
    value: 'sixMonth',
    label: 'Six Months'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, donoutChartData, setDonoutChartData }) => {
  const [value, setValue] = useState('month');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = '#F26462';
  const primaryDark = '#F5915A';
  const secondaryMain = 'green';
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,

      colors: [primary200, primaryDark],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
            borderRadius: 20
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const range = calculateDateRange(value);
  //     const dataWithRange = await fetchSalesDashboardData(range.fromDate, range.toDate);

  //     setDonoutChartData(dataWithRange.DonoutChartData);
  //   };

  //   fetchData(); // Invoke the async function immediately
  // }, [value]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing} sx={{ height: '60vh' }}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h2">Sales growth by Market Segment</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
              {donoutChartData.count === 0 || donoutChartData.projectedAmount === null ? (
                <NoDataDisplay />
              ) : (
                <DonutChartsCustom donoutChartData={donoutChartData} />
              )}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
