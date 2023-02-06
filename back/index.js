const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./mongoose');

const app = express()
const { User } = require('./models/index')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())


//enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    next();
});

app.get("/", (req, res)=>{
    console.log('backend: Dobijen zahtev na "/api"');
    console.log({User})
    User.find({'username': 'admin'}).then((users) => {
        console.log({users})
        res.send(users)
    }).catch((reason)=>{
        res.send(reason)
    })
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

app.on('exit', () =>{
    console.log('zatvaram mongodb konekciju')
    // mongoDB.close()
})
