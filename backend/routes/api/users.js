const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    // handleValidationErrors
  ];

  router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      let userEmail = await User.findOne({
        where: {
          email
        }
      })
      let userUsername = await User.findOne({
        where: {
          username
        }
      })

      // userEmail = userEmail.toJSON()
      // userUsername = userUsername.toJSON()

        if(userEmail.email === email) {
          res.status(403)
          res.json({
            message: "User already exists",
            statusCode: 403,
            errors: {
              email: "User with that email already exists"
            }
          })
        }

        else if(userUsername.username === username) {
          res.status(403)
          res.json({
            message: "User already exists",
            statusCode: 403,
            errors: {
              username: "User with that username already exists"
            }
          })
        }

        let user = await User.signup({ email, username, password, firstName, lastName });

      setTokenCookie(res, user);

      user = user.toJSON()
      delete user.createdAt
      delete user.updatedAt
      user.token = ''

      return res.json(
        user
      );
    }
  );

module.exports = router;
