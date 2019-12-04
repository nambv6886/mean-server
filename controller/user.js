const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BcryptRandomString = require('crypto-random-string');

const refreshTokens = {};

const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const isExist = await User.find({ email });
  if(!isExist) {
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email: req.body.email,
      password: hashPassword,
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result,
        status: 201
      })
    }).catch(e => {
      res.status(500).json({
        error: e,
        message: 'User create fail',
        status: 500
      })
    });
  } else {
    res.json({
      message: 'Email is exist',
      status: 401
    })
  }

}

exports.userLoginFunction = async (req, res) => {
  let fetchedUser;
  try {
    // find user in db
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        message: 'Email does not exsit',
        status: 401
      });
    }

    fetchedUser = user;

    // compate password by bcrypt
    isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // sign token by jwt
      const token = await jwt.sign({ email: fetchedUser.email }, 'superSecret', {
        expiresIn: 60
      });
      const refreshToken = await BcryptRandomString({ length: 256, type: 'base64'});
      refreshTokens[refreshToken] = fetchedUser.email;
      res.status(200).json({
        token,
        expiresIn: 60,
        email: fetchedUser.email,
        refreshToken,
        message: 'Login successfully',
        status: 200
      })
    } else {
      return res.json({
        message: 'Password is wrong',
        status: 401
      })
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: 'Auth failed',
      status: 401
    });
  }
}


exports.logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if(refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }

  return res.status(200).json({
    message: 'Logout successfully'
  })
}

exports.refresh = async(req, res) => {
  const refreshToken = req.body.refreshToken;
  if(refreshToken in refreshTokens) {
    const token = jwt.sign({ email: refreshTokens[refreshToken]}, 'superSecret', {
      expiresIn: 60
    });
    return res.status(200).json({
      token
    })
  } else {
    return res.status(401);
  }
}
