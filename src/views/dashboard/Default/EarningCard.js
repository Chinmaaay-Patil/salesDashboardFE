import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Box, Typography } from '@mui/material';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, cardData }) => {
  const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: cardData.bgColor,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    // width: 210,
    height: 190,

    '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      // background: theme.palette.secondary[800],
      borderRadius: '50%',
      top: -85,
      right: -95,
      [theme.breakpoints.down('sm')]: {
        top: -105,
        right: -140
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      // background: theme.palette.secondary[800],
      borderRadius: '50%',
      top: -125,
      right: -15,
      opacity: 0.5,
      [theme.breakpoints.down('sm')]: {
        top: -155,
        right: -70
      }
    }
  }));
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {' '}
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, mr: 1, mb: 0.75, zIndex: 9 }}>{cardData.leadStatus}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item></Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{ mb: 1.25, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 0.1 }}
              >
                <img alt="demo" src={cardData.icon} width={50} />
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 500, mr: 1, mb: 0.75 }}>{cardData.count}</Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, mr: 1, mb: 0.75 }}>
                  {cardData.opportunitiesCount && `${cardData.opportunitiesCount} opportunities`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool,
  cardData: PropTypes.any
};

export default EarningCard;
