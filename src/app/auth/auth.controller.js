import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'
import config from 'config'

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

export default {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    if (req.body.username === user.username && req.body.password === user.password) {
      const token = jwt.sign({
        username: user.username
      }, config.get('jwtSecret'));
      return res.json({
        token,
        username: user.username
      });
    }

    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    next(err);
  },

  /**
   * This is a protected route. Will return random number only if jwt token is provided in header.
   * @param req
   * @param res
   * @returns {*}
   */
  getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    res.json({
      user: req.user,
      num: Math.random() * 100
    });
  }
}
