import commonAPI from './axiosConfig';
import newLeads from 'assets/images/newLeads.png';
import closedLeads from 'assets/images/closedLeads.png';
import demo from 'assets/images/demo.png';
import quotation from 'assets/images/quotation.png';
const cardsData = [
  {
    id: 1,
    title: 'New Lead',
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
export const fetchSalesDashboardData = async (fromDate, toDate, salesPersonID) => {
  try {
    const response = await commonAPI.get(
      `/api/Dashboard/GetSalesDashboard?FromDate=${fromDate}&ToDate=${toDate}&SalesPersonID=${salesPersonID}`
    );

    const mergedArray = cardsData.map((cardItem) => {
      // Find the corresponding tableItem based on leadStatus
      const matchingTableItem = response.data.table.find((tableItem) => tableItem.leadStatus === cardItem.title);

      // If a match is found, return a new object with updated properties
      if (matchingTableItem) {
        return {
          ...matchingTableItem,
          icon: cardItem.icon,
          bgColor: cardItem.bgColor
        };
      }

      // If no match is found, return a new object with default properties
      return {
        leadStatus: cardItem.title,
        count: 0, // You may set a default value for count
        icon: cardItem.icon,
        bgColor: cardItem.bgColor
      };
    });
    // setDonoutChartData(response.data.table1[0]);
    // setStackedBarChartData(response.data.table2);
    // setSalesDashboardData(mergedArray);

    return {
      DonoutChartData: response.data.table1[0],
      StackedBarChartData: response.data.table2,
      SalesDashboardData: mergedArray
    };
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
};
