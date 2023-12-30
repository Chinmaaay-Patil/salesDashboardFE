import commonAPI from 'utils/axiosConfig';

export const modifyAndDownloadDocument = async (customerDetails) => {
  console.log('customerDetails', customerDetails);
  try {
    const data = {
      newCustomerName: customerDetails.labName,
      newBillingAddress: customerDetails.address
    };

    const response = await commonAPI.post('/api/Dashboard/ModifyDocument', data);
    const salesPersonsData = response.data;
    return salesPersonsData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
