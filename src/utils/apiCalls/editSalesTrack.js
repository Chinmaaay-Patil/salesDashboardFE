import axios from 'axios';
import commonAPI from 'utils/axiosConfig';

const editSalesTrack = async (salesTrackData) => {
  const payload = {
    id: salesTrackData.id,
    sourceId: salesTrackData.sourceId.sid,
    versionId: salesTrackData.versionId.vid,
    salesPersonId: salesTrackData.salesPersonId.sid,
    stateId: salesTrackData.stateId.stid,
    labName: salesTrackData.labName,
    ownerName: salesTrackData.ownerName,
    mobile: salesTrackData.mobile,
    email: salesTrackData.email,
    address: salesTrackData.address,
    createddate: salesTrackData.createddate,
    projectedAmount: salesTrackData.projectedAmount,
    requirement: salesTrackData.requirement,
    comment: salesTrackData.comment,
    followupdate: salesTrackData.followupdate,
    attachments: salesTrackData.attachments
  };
  console.log('play', payload);

  try {
    const response = await commonAPI.put(`/api/Dashboard/EditSalesTrack?id=${salesTrackData.id}`, payload); // Assuming you use a PUT request for editing

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default editSalesTrack;
