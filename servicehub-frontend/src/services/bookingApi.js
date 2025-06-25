import api from './api';

export const createBooking = async (bookingData) => {
  return api.post('/booking', bookingData);
};
