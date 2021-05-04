const router = require('express-promise-router')()
const jwtCheck = require('../middleware/jwtcheck') 

const { productsController } = require('../controllers')

router.route('/:id').get(productsController.getOne)
router.route('/').get(jwtCheck, productsController.getAll)
router.route('/').post(productsController.create)
router.route('/:id').put(productsController.update)
router.route('/:id').delete(productsController.delete)  

module.exports = router