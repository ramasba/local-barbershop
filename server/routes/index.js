const express = require('express');
const router = express.Router(); // eslint-disable-line

const getServicesInfo = require('../controllers/getServicesInfo');
const getBookingDates = require('../controllers/getBookingDates');
const restoreSession = require('../controllers/restoreSession');
const signIn = require('../controllers/signIn');
const register = require('../controllers/register');
const changeUserInfo = require('../controllers/changeUserInfo');
const setBooking = require('../controllers/setBooking');
const cancelBooking = require('../controllers/cancelBooking');
const avatarUpload = require('../controllers/avatarUpload');
const logout = require('../controllers/logout');
const logoutAllSessions = require('../controllers/logoutAllSessions');
const notFound = require('../controllers/notFound');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

router.get('/services', getServicesInfo);
router.get('/get-booking-dates', getBookingDates);
router.get('/restore-session', restoreSession);

router.post('/sign-in', signIn);
router.post('/register', register);
router.post('/change-user-info', changeUserInfo);
router.post('/set-booking', setBooking);
router.post('/cancel-booking', cancelBooking);
router.post('/upload', avatarUpload);
router.post('/logout', logout);
router.post('/logout-all-sessions', logoutAllSessions);

router.use('/*', notFound);

module.exports = router;
