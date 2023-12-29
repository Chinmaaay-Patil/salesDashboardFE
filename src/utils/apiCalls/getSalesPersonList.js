import commonAPI from 'utils/axiosConfig';

export const getSalesPersonList = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/GetSalesPerson`);

    const salesPersonsData = response.data;

    console.log('Sales Persons Data:', salesPersonsData);
    return salesPersonsData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
