const router = require('express-promise-router')()

const { productsController } = require('../controllers')

router.route('/:id').get(productsController.getOne)
router.route('/').get(productsController.getAll)
router.route('/').post(productsController.create)
router.route('/:id').put(productsController.update)
router.route('/:id').delete(productsController.delete)  

module.exports = router