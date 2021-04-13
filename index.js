const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




async function start() {
    try {
        const url = `mongodb+srv://mnjoyan2:QcW1yzsb8InU7Rgg@cluster0.zxfxt.mongodb.net/mevnshop?retryWrites=true&w=majority`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(5000, () => {
            console.log('running...');
        })
    } catch (err) {
        console.log(err)
    }
    
}

start()


