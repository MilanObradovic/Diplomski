const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./mongoose');

const app = express()
const { User, Bookmark } = require('./models/index')
const {ObjectId} = require("mongodb");

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

app.get("/user", (req, res)=>{
    console.log('backend: Dobijen zahtev na "/api"');
    console.log({User})
    User.find({'username': 'admin'}).then((users) => {
        console.log({users})
        res.send(users)
    }).catch((reason)=>{
        res.send(reason)
    })
})

app.post('/user', (req, res) => {

    switch (req.body.action) {
        case 'login': {
            let username = req.body.data.username;
            let password = req.body.data.password;
            User.findOne({username: username}).then((user) => {
                if(!!user?.isDisabled){
                    res.status(200).json("It seems that your account is not able make new requests at this time.");
                }
                if (user) {
                    if (user.password === password) {
                        res.status(200).json(user);
                    } else {
                        res.status(401).json("Wrong password.");
                    }
                } else {
                    res.status(404).json("There is no user with that username.");
                }
            }).catch(e => console.log(e))
            break;
        }
        case 'registration': {
            let newUser = req.body.data;
            let {username} = newUser;
            console.log({username})
            User.findOne({username: username}).then((user) => {
                console.log({user})
                if (user) {
                    res.status(404).json("Try another username.");
                } else {
                    User.create({...newUser}).then((user) => {
                        res.status(200).send(user);
                    });

                }
            }).catch(e => console.log(e));
            break;
        }
        default:
            break;
    }

})

app.post('/bookmark', (req, res)=>{
    switch (req.body.action) {
        case 'create':
            const newBookmark = req.body.data;
            Bookmark.create(newBookmark).then((bookmark)=>{
                res.status(200).send(bookmark);
            }).catch((e)=>{
                res.status(400).send(newBookmark);
                console.log({e})
            })
            break;
        case 'delete':
            const bookmarkToBeDeleted = req.body.data;
            Bookmark.findOneAndDelete({username: bookmarkToBeDeleted.username, locationName: bookmarkToBeDeleted.locationName}).then(()=>{
                res.status(200).send(bookmarkToBeDeleted);
            }).catch((e)=>{
                res.status(400).send(bookmarkToBeDeleted);
            })
            break;
        default:
            break;
    }
})
app.get('/bookmark/:id', (req, res)=>{
    Bookmark.find({userId: req.params.id}).then((result)=>{
        res.status(200).send(result)
    })
})

app.listen(3000, () => {
    console.group('Node server')
    console.log('Server is listening on port 3000');
    console.groupEnd()
})
app.on('exit', () =>{
    console.log('zatvaram mongodb konekciju')
    mongoose.connection.close()
    // mongoDB.close()
})
