import commonAPI from 'utils/axiosConfig';
import { getSourceLeads } from './getSourceLeadsList';

export const getSalesTrack = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/SalesList`);

    const SalesList = response.data;

    const sourceLeadData = await getSourceLeads();

    SalesList.forEach((element, index) => {
      const sourceIdValue = element.sourceId;
      const matchingElement = sourceLeadData.find((item) => item.sid === sourceIdValue);
      if (matchingElement) {
        SalesList[index].sourceId = { ...matchingElement };
      }
    });

    console.log('chin', SalesList);
    return SalesList;
  } catch (error) {
    console.error('Error fetching getSalesTrack:', error.message);
    throw error;
  }
};
