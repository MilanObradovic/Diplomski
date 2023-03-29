import express from 'express';
import bodyParser from 'body-parser';
import {mongoose} from './src/mongoose.js';
import {User, Bookmark, LocationLog} from './src/models/index.js';
import alertNotificationCron from './src/crons/alertNotificaition.js';
import {corsEnabler, apiRestriction, apiAccessLogger} from './src/middlewares.js';

const app = express()
import fetch from 'node-fetch';
import {initializeFirebase, sendNotification} from './src/firebase.js';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

//adding middlewares
app.use(corsEnabler);
app.use(apiRestriction);
app.use(apiAccessLogger);

//initial Firebase in order for notifications to work
initializeFirebase();

//start alert notification cron;
alertNotificationCron.start();

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
            User.findOne({username: username}).then((user) => {
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
            console.log('udje u deactivate');
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
            break;
        }
        case 'FCMToken': {
            console.log('udje u fcm token');
            let {username, token} =  req.body.data;
            if(!username || !token){
                res.status(400).json("Username/Token must be specified!")
            }else{
                User.findOneAndUpdate({username: username}, {fcmToken: token}).then(() => {
                    res.status(200).json("User is successfully updated!");
                }).catch((e)=>{
                    res.status(500).json("Internal server error.");
                })
            }
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
