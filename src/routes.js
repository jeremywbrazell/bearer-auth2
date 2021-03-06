'use strict';

const express = require('express');
const authRouter = express.Router();
const { Users } = require('./auth/models/index.js');
const basicAuth = require('./auth/middleware/basic.js')
const bearerAuth = require('./auth/middleware/bearer.js');

authRouter.use(express.json());

authRouter.post('/signup', async (req, res, next) => {
    console.log('req dot body', req.body);
  try {
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
  })


authRouter.post('/signin', basicAuth(Users), (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(req.user);
});

authRouter.get('/users', bearerAuth(Users), async (req, res) => {
  const users = await Users.findAll({});
  console.log('this is users', users);
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secretstuff', bearerAuth(Users), async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;