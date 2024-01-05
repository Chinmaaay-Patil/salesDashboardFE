import commonAPI from 'utils/axiosConfig';

function useSalesPerson() {
  async function handleSubmitAddSalesPersonForm(SalesPersonData) {
    SalesPersonData.sid = 0;
    try {
      const response = await commonAPI.post('/api/Dashboard/CreateSalesPerson', SalesPersonData);

      return response.data;
    } catch (error) {
      console.error('Error: handleSubmitAddSalesPersonForm:', error);
      throw error;
    }
  }
  return { handleSubmitAddSalesPersonForm };
}

export default useSalesPerson;
