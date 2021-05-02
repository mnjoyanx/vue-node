const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const routes  = require('./src/routes/index.js')



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(function (req, res, next) { 

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999'); 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


routes.routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})

 


async function start() {
    try {
        
        const url = process.env.MONGO_URI
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(3000, () => {
            console.log('running...');
        })
    } catch (err) {
        console.log(err)
    }  
    
} 
 
start()


