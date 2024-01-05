import commonAPI from 'utils/axiosConfig';

function useSourcePerson() {
  async function handleSubmitAddSourcePersonForm(SourcePersonData) {
    try {
      const response = await commonAPI.post('/api/Dashboard/CreateSourcePerson', SourcePersonData);
      return response.data;
    } catch (error) {
      console.error('Error: handleSubmitAddSourcePersonForm:', error);
      throw error;
    }
  }
  return { handleSubmitAddSourcePersonForm };
}

export default useSourcePerson;
