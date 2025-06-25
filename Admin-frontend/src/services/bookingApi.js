import api from './api';

export const getAllBookings = async () => {
  return api.get('/booking/all');
};
