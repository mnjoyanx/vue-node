const maincontroller = require('./main.controller')
const {Prodcut} = require('../model')


module.exports = {
    ...maincontroller(Prodcut)
}