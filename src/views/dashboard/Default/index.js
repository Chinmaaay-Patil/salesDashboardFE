import { useEffect, useState } from 'react';

// material-ui
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import newLeads from 'assets/images/newLeads.png';
import closedLeads from 'assets/images/closedLeads.png';
import demo from 'assets/images/demo.png';
import quotation from 'assets/images/quotation.png';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { useNavigate } from 'react-router';
import DateComponent from 'ui-component/DatePicker';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    }
  }, []);
  const cardsData = [
    {
      id: 1,
      title: 'New Leads',
      icon: newLeads,
      count: 1024,
      opportunitiesCount: 0,
      bgColor: 'linear-gradient(226deg, #E0D2FF 5.51%, #9678DC 96.49%)'
    },
    {
      id: 2,
      title: 'Demo',
      icon: demo,
      count: 2024,
      opportunitiesCount: 1,
      bgColor: 'linear-gradient(45deg, #3763CC 24.77%, #94C3FF 94.1%)'
    },
    {
      id: 3,
      title: 'Quotation',
      icon: quotation,
      count: 3024,
      opportunitiesCount: 2,
      bgColor: 'linear-gradient(44deg, #F26462 29.52%, #F8B9BA 96.71%)'
    },
    {
      id: 4,
      title: 'Closed Leads',
      icon: closedLeads,
      count: 4024,
      opportunitiesCount: 3,
      bgColor: 'linear-gradient(46deg, #F5915A 39.61%, #FFC693 96.01%)'
    }
  ];
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 }
  ];
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* <Box sx={{ display: 'flex', gap: 3, pb: 2, border: '1px solid red' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            size="small"
            sx={{ width: '20%' }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />{' '}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            sx={{ width: '20%' }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />{' '}
        </Box> */}{' '}
        <Typography sx={{ mb: 2 }}>Filters :</Typography>
        <Grid container spacing={gridSpacing} sx={{ pb: 2 }}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <DateComponent label="From Date" />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <DateComponent label="To Date" />
          </Grid>{' '}
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              sx={{ width: '100%' }}
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Sales Person" />}
            />{' '}
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                borderRadius: 3
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing}>
          {cardsData.map((cardData, index) => {
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
            <PopularCard isLoading={isLoading} />
          </Grid>{' '}
          <Grid item lg={6} xs={12} md={4}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
