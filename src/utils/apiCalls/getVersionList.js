import commonAPI from 'utils/axiosConfig';

export const getVersionList = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/GetVersion`);

    const salesPersonsData = response.data;

    return salesPersonsData;
  } catch (error) {
    console.error('getVersionList.js:', error.message);
    throw error;
  }
};
