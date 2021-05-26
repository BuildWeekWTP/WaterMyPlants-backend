const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model');
const { checkUsernameFree, checkPasswordLength } = require('./auth-middleware');

const buildToken = require('./token-builder');

router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.user_password, rounds);
  user.user_password = hash;

  Users.add(user)
    .then(saved => {
      console.log(saved)
      res.status(201).json({
        message: `Great to have you, ${saved.user_username}`
      });
    })
    .catch(next);
});


router.post('/login', (req, res, next) => {
  let { user_username, user_password } = req.body;

  Users.findBy({ user_username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(user_password, user.user_password)){
        // req.session.user = user;
        const token = buildToken(user)
        res.status(200).json({
          message: `Welcome back ${user.user_username}`,
          token,
        })
      } else {
        res.status(401).json({ message: `Invalid credentials`})
      }
    })
    .catch(next);
})




module.exports = router;