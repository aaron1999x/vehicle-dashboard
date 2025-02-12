import axios from 'axios';

export const getVehicles = async () => {
  const response = await axios.post(
    'http://ia.tnx1.xyz/api/v1/ia/vehicle/get_all_vehicles'
  );
  return await response.data;
};
