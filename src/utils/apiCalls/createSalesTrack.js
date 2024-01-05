import axios from 'axios';
import commonAPI from 'utils/axiosConfig';

const createSalesTrack = async (salesTrackData) => {
  const playload = {
    sourceId: salesTrackData.sourceOfLead.sid,
    versionId: salesTrackData.version.vid,

    salesPersonId: salesTrackData.salesPerson.sid,
    stateId: salesTrackData.state.stid,

    labName: salesTrackData.labName,
    ownerName: salesTrackData.ownerName,
    mobile: salesTrackData.mobile,
    email: salesTrackData.email,
    address: salesTrackData.address,

    createddate: `${salesTrackData.date}T${new Date().toLocaleTimeString('en-US', { hour12: false })}`,

    projectedAmount: salesTrackData.amount,
    requirement: salesTrackData.detailRequirement,
    comment: salesTrackData.comment,
    followupdate: `${salesTrackData.followupDate}T${new Date().toLocaleTimeString('en-US', { hour12: false })}`,
    attachments: salesTrackData.attachment
  };

  try {
    const response = await commonAPI.post('/api/Dashboard/CreateSalesTrack', playload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createSalesTrack;
