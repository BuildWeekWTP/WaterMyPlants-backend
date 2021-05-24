const db = require('../data/db-config.js')

module.exports = {
  add,
  findById,
  getAll,
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users as u')
    .select('u.user_id', 'u.user_email')
    .where('u.user_id', id)
    .first();
}

function getAll() {
  return db('users');
}
