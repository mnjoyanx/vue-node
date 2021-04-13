const { Schema, model, Schema: {Types: { ObjectId }} } = require('mongoose')


const categorySchema = new Schema({
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

    categoryId: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ]
})


module.exports = model('Category', categorySchema)