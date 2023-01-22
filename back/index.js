const express = require('express');
const bodyParser = require('body-parser');
const { mongoDB } = require('./mongoDB');
// const {
//     mongoose
// } = require('./db/mongoose');

const app = express()
const { Users } = require('./models/Users')

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
    res.send({message: 'very good'})
    let user;
    Users.find().then((users) => {
        user = users.filter((user) => user.username === "admin");
        console.log({user})
        res.send(user)
    })
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

app.on('exit', () =>{
    console.log('zatvaram mongodb konekciju')
    // mongoDB.close()
})
