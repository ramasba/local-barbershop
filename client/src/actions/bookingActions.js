import {setBookingAPI, cancelBookingAPI} from '../API';

const newBooking = (date, time, title, link) => ({
  type: 'NEW_BOOKING',
  date,
  time,
  title,
  link,
});

export const fetchNewBooking = (date, time, title, link) => (dispatch) => {
  setBookingAPI({
    date,
    time,
    title,
    link,
  }).then(() => dispatch(newBooking(date, time, title, link)));
};

const cancelBooking = (date, time) => ({
  type: 'CANCEL_BOOKING',
  date,
  time,
});

export const fetchCancelBooking = (date, time) => (dispatch) => {
  cancelBookingAPI({
    date,
    time,
  }).then(() => dispatch(cancelBooking(date, time)));
};
