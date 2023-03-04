const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./mongoose');

const app = express()
const { User, Bookmark, LocationLog } = require('./models/index')
const {ObjectId} = require("mongodb");
const randToken = require("rand-token");

const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./weatherapp-1a469-firebase-adminsdk-xm0vs-c6391977bc.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});
const notification = {
    notification: {
        title: "Hey yo",
        body: "Outside a shit storm"
    }
};

const fcmToken = 'e1U_QNUZSFuOLOAuYwPdYd:APA91bFzlB__OUXJ9y99E0dtxBGamGE-Ye8qJ2oR6xmVrfS26aB98la_pT3tqa3Q7zyPtOz9z2Yhb8yir_fyAFWi4U1rpkDi_up3alnvpTg1JxLMaUudEAB_e88a5uGAH9QlNP20sVRx'
const sendNotification  =() => {
    setTimeout(()=>{

    firebaseAdmin.messaging().sendToDevice(fcmToken, notification).catch((e)=>{
        console.log({e})
    });
    }, 5000)

}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

//enabling CORS
function corsEnabler (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    next();
}

const  apiRestriction =  async (req, res, next)=> {
    const token = req.headers?.token;
    if(token){
        const user = await User.findOne({token})
        if(user.isDisabled){
            res.status(401).json("It seems that your account is not able make new requests at this time.");
            return;
        }else{
            next();
        }
    }else{
        next();
    }
}

const  apiAccessLogger =  async (req, res, next)=> {
    const token = req.headers?.token;
    if(token){
        const user = await User.findOneAndUpdate({token}, {lastActivity: Date.now(), $inc: { apiAccessCounter: 1}})
        next();
    }else{
        next();
    }
}
//adding middlewares
app.use(corsEnabler);
app.use(apiRestriction);
app.use(apiAccessLogger);

app.get("/user/all", (req, res)=>{
    User.find({}).then((users) => {
    // User.find({}).skip(2).limit(2).then((users) => {
        res.send(users)
    }).catch((reason)=>{
        res.send(reason)
    })
})

app.get('/notification', (req, res) => {
    sendNotification();
    res.status(200).send()
})

app.post('/user', (req, res) => {

    switch (req.body.action) {
        case 'login': {
            let username = req.body.data.username;
            let password = req.body.data.password;
            User.findOne({username: username}).then((user) => {
                if(!!user?.isDisabled){
                    res.status(401).json("It seems that your account is not able make new requests at this time.");
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
        case 'changePassword': {
            let data = req.body.data;
            let {username, oldPassword, newPassword} = data;
            User.findOne({username: username}).then((user) => {
                if (user.password === oldPassword) {
                    User.findOneAndUpdate({username}, {
                        password: newPassword
                    }).then(()=>{
                        res.status(200).json("Password successfully changed!");
                    })
                } else {
                    res.status(401).json("Old password is not correct! Please enter correct password.");
                }
            }).catch(e => console.log(e));
            break;
        }
        case 'deactivate': {
            let {username, isActive} =  req.body.data;
            if(!username){
                res.status(400).json("Username must be specified!")
            }
            User.findOne({username: username}).then((user) => {
                if(user.role === 'admin'){
                    res.status(400).json("User with admin role can not be deactivated!");
                }else{
                    User.findOneAndUpdate({username: username}, {isDisabled: !isActive}).then(() => {
                        res.status(200).json("User is successfully updated!");
                    })
                }
            }).catch((e)=>{
                res.status(500).json("Internal server error.");
            })
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
app.post('/locationLog', (req, res)=>{
    const {locationName} = req.body.data
    LocationLog.findOne({locationName}).then((location)=>{
        if(location){
            LocationLog.findOneAndUpdate({locationName}, {$inc: { counter: 1}}).then(()=>{
                res.status(200).send()
            })
        }else{
            LocationLog.create({locationName}).then(()=>{
                res.status(200).send()
            })
        }
    })
})

app.get("/locationLog", (req, res)=>{
    LocationLog.find({}).then((locationsLogs) => {
        // User.find({}).skip(2).limit(2).then((users) => {
        res.send(locationsLogs)
    }).catch((reason)=>{
        res.send(reason)
    })
})

app.get('/bookmark/:id', (req, res)=>{
    Bookmark.find({userId: req.params.id}).then((result)=>{
        res.status(200).send(result)
    })
})

const  populateApiAccessCounter =  () => {

    User.find().then((users)=>{
        users.forEach(async user=>{
            const a = await User.findOneAndUpdate({username: user.username}, { apiAccessCounter: Math.round(Math.random()*100)})
        })
    })
}
app.listen(3000, () => {
    console.group('Node server')
    console.log('Server is listening on port 3000');
    console.groupEnd()
    // populateApiAccessCounter();
})
app.on('exit', () =>{
    console.log('zatvaram mongodb konekciju')
    mongoose.connection.close()
    // mongoDB.close()
})
