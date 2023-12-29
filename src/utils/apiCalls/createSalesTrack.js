import axios from 'axios';
import commonAPI from 'utils/axiosConfig';

const createSalesTrack = async (salesTrackData) => {
  const postData = {
    // id: 0,
    labName: salesTrackData.labName,
    ownerName: salesTrackData.ownerName,
    mobile: salesTrackData.mobile,
    email: salesTrackData.email,
    address: salesTrackData.address,
    createddate: salesTrackData.date,
    projectedAmount: salesTrackData.amount,
    requirement: salesTrackData.detailRequirement,
    comment: salesTrackData.comment,
    followupdate: salesTrackData.followupDate,
    attachments: salesTrackData.attachment,
    sourceOfLeadOptions: [salesTrackData.sourceOfLead],
    sourcePersonOptions: [salesTrackData.sourcePersonName],
    versionOptions: [salesTrackData.version],
    salesPersonOptions: [salesTrackData.salesPerson],
    stateOptions: [salesTrackData.state]
  };

  try {
    const response = await commonAPI.post('/api/Dashboard/CreateSalesTrack', postData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createSalesTrack;
