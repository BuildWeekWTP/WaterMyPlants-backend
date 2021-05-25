const router = require('express').Router()

const Users = require('./users-model.js')
const Plants = require('../plants/plants-model.js')

router.get('/', (req, res, next) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});


router.get('/:id/plants', (req, res, next) => {
  Plants.findByUserId(req.params.id)
    .then(plants => {
      res.status(200).json(plants)
    })
    .catch(next);
})

module.exports = router;