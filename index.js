const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes  = require('./src/routes/index.js')



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


routes.routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})





async function start() {
    try {
        
        const url = `mongodb+srv://mnjoyan:2EZBGrRhWQYNBTdJ@cluster0.1bwis.mongodb.net/mevnShop?retryWrites=true&w=majority`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(5000, () => {
            console.log('running...');
        })
    } catch (err) {
        console.log(err)
    }
    
}

start()


