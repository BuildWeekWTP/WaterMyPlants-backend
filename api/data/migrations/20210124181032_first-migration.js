exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_email', 320)
        .unique()
        .notNullable()
      users.string('user_username', 200)
        .unique()
        .notNullable()
      users.string('user_password', 200).notNullable()
      users.string('user_phone_number', 20).notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('plant_nickname', 200).notNullable()
      plants.string('plant_species', 320).notNullable()
      plants.string('plant_h2ofrequency', 200).notNullable()
      plants.string('plant_image_url', 512)
    })
    .createTable('users_plants', (users_plants) => {
      users_plants.integer('user_id')
        .unsigned()
        .references('users.user_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      users_plants.integer('plant_id')
        .unsigned()
        .references('plants.plant_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('users_plants')
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
