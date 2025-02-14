import axios from 'axios';
import type { VehicleRequest } from '../types';

const BASE_URL = 'https://ia.tnx1.xyz/api/v1/ia/vehicle';

const headers = {
  'Content-Type': 'text/plain', //application.json causes CORS
};

export const getVehiclesWithFilters = async (
  filters: Partial<VehicleRequest> = {}
) => {
  const hasFilters = Object.keys(filters).length > 0;

  const response = await axios.post(
    `${BASE_URL}/get_all_vehicles`,
    hasFilters ? filters : undefined,
    { headers }
  );

  return response.data;
};

export const getVehiclesHighlight = async () => {
  const response = await axios.post(`${BASE_URL}/get_highlights`);
  return response.data;
};
