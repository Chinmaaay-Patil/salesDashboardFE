import commonAPI from 'utils/axiosConfig';

function useSalesPerson() {
  async function handleSubmitAddSalesPersonForm(SalesPersonData) {
    console.log('inn hook', SalesPersonData);

    try {
      const response = await commonAPI.post('/api/Dashboard/CreateSalesPerson', SalesPersonData);

      console.log('Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  return { handleSubmitAddSalesPersonForm };
}

export default useSalesPerson;
