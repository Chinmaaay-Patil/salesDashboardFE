import commonAPI from 'utils/axiosConfig';
import { getSourceLeads } from './getSourceLeadsList';
import { getSalesPersonList } from './getSalesPersonList';
import { getStateList } from './getStateList';
import { getVersionList } from './getVersionList';

export const getSalesTrack = async () => {
  try {
    const response = await commonAPI.get(`/api/Dashboard/SalesList`);

    let SalesList = response.data;

    try {
      const [sourceLeadData, salesPersonData, stateData, versionData] = await Promise.all([
        getSourceLeads(),
        getSalesPersonList(),
        getStateList(),
        getVersionList()
      ]);

      SalesList = SalesList.map((element) => {
        const sourceIdValue = element.sourceId;
        const matchingElementSource = sourceLeadData.find((item) => item.sid === sourceIdValue);

        const sourcePersonIdValue = element.salesPersonId;
        const matchingElementSalesPerson = salesPersonData.find((item) => item.sid === sourcePersonIdValue);

        const stateIdValue = element.stateId;
        const matchingElementState = stateData.find((item) => item.stid === stateIdValue);

        const versionIdValue = element.versionId;
        const matchingElementVersion = versionData.find((item) => item.vid === versionIdValue);

        return {
          ...element,
          sourceId: matchingElementSource ? { ...matchingElementSource } : null,
          salesPersonId: matchingElementSalesPerson ? { ...matchingElementSalesPerson } : null,
          stateId: matchingElementState ? { ...matchingElementState } : null,
          versionId: matchingElementVersion ? { ...matchingElementVersion } : null
        };
      });
      console.log('SalesList', SalesList);
      return SalesList;
    } catch (error) {
      console.error('Error fetching getSalesTrack:', error.message);
      throw error;
    }

    // console.log('chin', SalesList);
    // return SalesList;
  } catch (error) {
    console.error('Error fetching getSalesTrack:', error.message);
    throw error;
  }
};
