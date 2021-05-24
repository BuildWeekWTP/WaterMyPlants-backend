const bcrypt = require('bcryptjs');
const buildToken = require('./token-builder');
const router = require('express').Router();

const Users = require('../users/users-model');


router.post('/register', (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({
        message: `Great to have you, ${saved.user_email}`
      });
    })
    .catch(next);
})


module.exports = router;