const crypto = require('crypto');
const createError = require('http-errors');
const User = require('../models/user');
const sessionizeUser = require('../util/sessionizeUser');

const register = (req, res, next) => {
  const {name, phone, email, pass: password} = req.body;

  User.findOne({email}, function(err, user) {
    if (err) {
      return next(createError(500, 'Server error, please try again later...'));
    }

    if (user) {
      return next(createError(409, 'This email address already exists!'));
    }

    const UID = crypto.randomBytes(48).toString('base64');
    const newUser = new User({
      session: [UID],
      name,
      phone,
      email,
      password,
    });

    newUser.save(function(err, user) {
      if (err) {
        return next(createError(500, 'Server error, please try again later...'));
      }

      const sessionUser = sessionizeUser(user);

      res.cookie('UID', UID, {
        httpOnly: true, secure: process.env.HTTPS === 'enabled' ? true : false,
      });
      res.send(sessionUser);
    });
  });
};

module.exports = register;
