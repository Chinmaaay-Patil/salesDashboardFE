import commonAPI from 'utils/axiosConfig';

export const getSourceLeads = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/GetSourceLead`);

    const salesPersonsData = response.data;

    return salesPersonsData;
  } catch (error) {
    console.error('getSourceLeads:', error.message);
    throw error;
  }
};
