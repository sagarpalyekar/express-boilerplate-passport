
const jwt = require('jwt-simple')
const config = require('../config');
const User = require('../models/user');

// import User from '../models/user';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // User has already had their email and passoword auth'd
  // We just need to give them a token
  return res.send({ token: tokenForUser(req.user) });
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password' })
    }

    const existingUser = await User.findOne({ email });
    console.log('existingUser: ', existingUser);
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use.' });
    }

    // const user = await User.create([{ email: email, password: password }]);
    // console.log('user: ', user);
    const user = new User({ email, password });
    const data = await user.save();

    res.status(201).json({ token: tokenForUser(user), success: true, data });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: 'Something went wrong!!' });
  }
}
