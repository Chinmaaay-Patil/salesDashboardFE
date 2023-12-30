import commonAPI from 'utils/axiosConfig';

export const modifyAndDownloadDocument = async (customerDetails) => {
  try {
    const response = await commonAPI.post(
      `https://salesapi.elabassist.com/api/Dashboard/ModifyDocument?newCustomerName=${customerDetails.labName}&newBillingAddress=${customerDetails.address}`,
      {
        versionId: 0,
        labName: 'string',
        address: 'string',
        textFilePath: 'string'
      }
    );
    const salesPersonsData = response.data;
    return salesPersonsData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
