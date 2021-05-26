const db = require('../data/db-config.js');


async function checkUsernameFree (req, res, next) {
  const userQuery = await db('users')
    .select('user_id', 'user_username')
    .where('user_username', req.body.user_username);
  if (userQuery.length !== 0){
    res.status(422).json({
      message: "Username taken",
    });
  } else {
    next();
  }
}

function checkPasswordLength (req, res, next) {
  if (!req.body.user_password || req.body.user_password.length <= 6){
    res.status(422).json({
      message: "Password must be longer than 6 characters",
    });
  } else {
    next();
  }
}

module.exports = {
  checkUsernameFree,
  checkPasswordLength,
}
