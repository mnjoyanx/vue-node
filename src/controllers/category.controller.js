const maincontroller = require('./main.controller')
const {Category} = require('../model')


module.exports = {
    ...maincontroller(Category)
}