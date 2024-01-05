import commonAPI from 'utils/axiosConfig';

export const getSourcePerson = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/GetSourcePerson`);

    const salesPersonsData = response.data;

    return salesPersonsData;
  } catch (error) {
    console.error('GetSourcePerson:', error.message);
    throw error;
  }
};
