const db = require('../data/db-config.js')

module.exports = {
  add,
  findBy,
  findById,
  getAll,
}

async function add(user) {
  const [user_id] = await db('users').insert(user, 'user_id');
  // return db('users').where({user_id}).select('user_id', 'user_email', 'user_phone_number').first()
  return findById(user_id);
  
}

function findBy(filter) {
  return db('users as u')
    .select('u.user_id', 'u.user_username', 'u.user_email', 'u.user_password')
    .where(filter)
}

function findById(id) {
  return db('users as u')
    .select('u.user_id', 'u.user_email', 'u.user_phone_number')
    .where('u.user_id', id)
    .first();
}

function getAll() {
  return db('users');
}
