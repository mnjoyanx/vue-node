const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()



async function start() {
    const url = `mongodb+srv://mnjoyan:duQNDBCBlLC0eUBY@cluster0.zxfxt.mongodb.net/mevn?retryWrites=true&w=majority`
    mongoose.connect(url, {})
}

app.listen(5000, () => {
    console.log('running...');
})