import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import newLeads from 'assets/images/newLeads.png';
import closedLeads from 'assets/images/closedLeads.png';
import demo from 'assets/images/demo.png';
import quotation from 'assets/images/quotation.png';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
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
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
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
          {/* <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
