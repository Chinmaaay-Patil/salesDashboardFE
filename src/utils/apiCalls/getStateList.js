import commonAPI from 'utils/axiosConfig';

export const getStateList = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/GetState`);

    const salesPersonsData = response.data;

    return salesPersonsData;
  } catch (error) {
    console.error('getStateList', error.message);
    throw error;
  }
};
