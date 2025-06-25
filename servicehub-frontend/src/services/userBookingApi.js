import api from './api';

export const getUserBookings = async () => {
  return api.get('/booking/my');
};
