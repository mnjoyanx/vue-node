const { Schema, model, Schema: {Types: { ObjectId }} } = require('mongoose')


const productSchema = new Schema({
    title: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },
    
    price: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    imgUrl: {
        type: String,
        default: 'no image'
    },

    categoryId: {
            type: ObjectId,
            ref: 'Product'
        }
})


module.exports = model('Product', productSchema)