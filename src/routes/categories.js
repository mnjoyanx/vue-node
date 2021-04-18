const router = require('express-promise-router')()

const { categoriesController } = require('../controllers')

router.route('/:id').get(categoriesController.getOne)
router.route('/').get(categoriesController.getAll)
router.route('/').post(categoriesController.create)
router.route('/:id').put(categoriesController.update)
router.route('/:id').delete(categoriesController.delete)  

module.exports = router