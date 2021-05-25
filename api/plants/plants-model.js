const db = require('../data/db-config.js');

module.exports = {
  add,
  findById,
  findByUserId,
  getAll,
}

async function add(plant){
  const [plant_id] = await db('plants').insert(
    {
      plant_nickname: plant.plant_nickname,
      plant_species: plant.plant_species,
      plant_h2ofrequency: plant.plant_h2ofrequency,
      plant_image_url: plant.plant_image_url,
    }, 'plant_id');
  // const newPlant = findById(plant_id);
  await db('users_plants')
    .insert({
      user_id: plant.user_id,
      plant_id: plant_id,
    })
  return findById(plant_id);
}

function findById(plant_id) {
  return db('plants as p')
    .select('p.plant_id', 'p.plant_nickname', 'p.plant_species', 'plant_h2ofrequency', 'p.plant_image_url')
    .where('p.plant_id', plant_id)
    .first()
}

function findByUserId(user_id){
return db('plants as p')
  .leftJoin('users_plants as up')
  .where('up.user_id', user_id)
  .select('p.plant_id', 'p.plant_nickname', 'p.plant_species', 'p.plant_h2ofrequency', 'p.plant_image_url')
}

function getAll(){
  return db('plants')
}