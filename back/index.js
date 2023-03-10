import express from 'express';
import bodyParser from 'body-parser';
import {ObjectId} from 'mongodb';
import randToken from 'rand-token';
import {CronJob} from 'cron';
import {mongoose} from './mongoose.js';
import {User, Bookmark, LocationLog} from './models/index.js';

const app = express()
import fetch from 'node-fetch';

import firebaseAdmin from "firebase-admin";

// import serviceAccount from "./weatherapp-1a469-firebase-adminsdk-xm0vs-c6391977bc";;

const service = {
    "type": "service_account",
    "project_id": "weatherapp-1a469",
    "private_key_id": "c6391977bc931594468dfdaa62e02655908f3155",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQqFX98S67F0M8\nSGERp/WwX9/H8TF898jTzh46SSom44SJdxN1O/d2w45edWLF9eZ6enAcHMvE41dL\nxsrnIkbNvhEjgISrkshBQYfWuy3Hc2Ez7oUGhZ1pWVa0ynZK6fi+YYo06RjglJ6A\nSsjUykdmPDyOsg9FkpgFGDH3e+Z0IHrrdbbHAcBMg8+MwTvfyZUo0cbnd2n0QaB+\nJFLJHELct7lxQHu8H4v75B3OME8XX0txFq8xudmsIZlAzR08UIQBU9f1ER2l22Lt\nfBmbSwDzLuKrHWS7eAIPi349oDTONNGA63o7Y36TG/7hsGpYPj0jHzXF1tDEm5mc\nRUJ4Z34fAgMBAAECggEABU/r1InB41B9zTiYhA8PIbznIRuCY4iZa88JFPnM4W2U\nb72A2NC8haEH7F63s4uFoSOh3A1doLca/1phyw2j2NQYcptwhT+46nRlJXHhgfzt\nghl1+IsJTWfRXcvzxAd95jbsgllW4UzXVjPRNh2qQK+S6R0eZ2qKhUKu7vqQDO/E\n/F9xUOolDeobLMW4dgA6TjiHBOrsg/5IUFxI6EyQ9AlzzNx3i6wMz+m5blSHg/2a\nSbfPBh1uQwMTwX33G9HXjuD4ZVLc3lp3hMrviPiqh2+Cvu575J47G3aQMRT0Xt1r\nxNTXphkD5x3EZn7Xo41OusveKxxj1jgca+DSh+xTyQKBgQDqfFOqV3kPKx3SbrMo\nqlkytwL6pHGlwdZTxYeP5Vzibff0SigTd8k2Ifzg1d7rMHuDX5xbCJwZt6jg0oNY\nqUEJ0y9Go4qSg0+jkctJF5XXH6WqNXtxTx8OQVsltiqCz1GiuFCWySPTKTrr2JXr\n58v4yI0TrDENdI4i448cfhFEGQKBgQDjzVnKtlk1r5rBX+Sc4Rl+1lS03zln/1uG\nnpcyWDS2feBmNRfidB3MYeoZv8jcMF18h+lz2xp4T7YNRIVcRjLwSdUzmoTnKReK\n/4/uEHMwGfRw7lkFb4zuVC9TIwQ9fgmFIG1mLcsP0GwA95M5QgqoYACvkSlWlwXF\nR6wJK/5a9wKBgQDIumFMwtDJIVnIGCeaOilddrlAIqF/Ce4VjFS949SdqRHHt+uS\nrso6YuH8/lhz8O7qyWAptbcbdNNGki8KKOmaJYSk7b7kKTB1j4r8KQqGO3svt9TS\nbK7jHyONpuHBVQRHTYz/Z3QZgYQE/UVpyuYbNGNAYfkj0ZETYMXT2D+jkQKBgQCf\n8ewMz7GdZznScoDywX4EN3rsMBt/cKUTxUBFwfbo90LaoIavonXVrh4PjD/8khzh\ntg/tH7bbKKSbdjPo0QUs/7opbGHKaGi2WK/3KCeoa2Dc9g0dKvCZ2hQMXHa6skb+\n6QDHEHoWFXHvz+TX/A29oQJ6QwLyYEFV/ffFzNTfiwKBgCTNotfGtoAwd/Xny3lx\n61eGtlAKY36E4DjtWuJYDbSjFggZtdVZW5QHWhXQ/VnWYmv+bJnkNs1CLVEBEAlZ\n55pusXMtNqGimkygk02YFlNvAWz5MYHJ9e7CA4F1WC3zpM3H3e5Kei60CPALqEW8\naR6OZ5EVQb/hj8JpYiZYFEw4\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xm0vs@weatherapp-1a469.iam.gserviceaccount.com",
    "client_id": "101508092895558362218",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xm0vs%40weatherapp-1a469.iam.gserviceaccount.com"
}
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(service)
});
const notificationBuilder = (data, location) => {
    return {notification: {
        title: data?.headline,
        body: `${location}, ${data?.event}`
    }}
};

const fcmToken = 'e1U_QNUZSFuOLOAuYwPdYd:APA91bFzlB__OUXJ9y99E0dtxBGamGE-Ye8qJ2oR6xmVrfS26aB98la_pT3tqa3Q7zyPtOz9z2Yhb8yir_fyAFWi4U1rpkDi_up3alnvpTg1JxLMaUudEAB_e88a5uGAH9QlNP20sVRx'
const sendNotification  =({fcmTokens, data, location}) => {
    data.alert.forEach((alert)=> {
        firebaseAdmin.messaging().sendToDevice(fcmTokens, notificationBuilder(alert, location)).catch((e) => {
                console.log({e})
        })
    })
}
const API_KEY = '0b6420634b864682946211718232102';

const BASE_WEATHER_URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&format=json&num_of_days=14`;

const requestUrl = (placeForSearch) =>
    BASE_WEATHER_URL +
    `&q=${placeForSearch}` +
    '&tp=1' +
    '&alerts=yes';

//every 10 seconds 0/10 * * * * *
//every hour 0 0 * * * * *
// CRON JOB
const job = new CronJob('0/10 * * * * *',  async function  () {
    const fcmTokensByLocation = {};
    const alertsByLocation = {};
    const bookmarks = await Bookmark.find({});
    for(let i=0; i<bookmarks.length; i++){
        const user = await User.findOne({username: bookmarks[i].userId})
        if(user && user.fcmToken){
            if(fcmTokensByLocation[bookmarks[i].locationName]){
                fcmTokensByLocation[bookmarks[i].locationName].push(user.fcmToken)
            }else{
                fcmTokensByLocation[bookmarks[i].locationName]=[user.fcmToken]
            }
        }
    }
    for(let i=0; i<bookmarks.length; i++){
        try{
            const response = await fetch(requestUrl(bookmarks[i].locationName));
            const data = await response.json();
            const {alerts} = data.data;
            if(alerts){
                alertsByLocation[bookmarks[i].locationName] = alerts;
            }
        }catch (e) {
            console.log({e})
        }

    }
    Object.keys(alertsByLocation).forEach(location=>{
        if(alertsByLocation[location].alert.length > 0 && fcmTokensByLocation[location] && fcmTokensByLocation[location].length > 0){
            sendNotification({fcmTokens: fcmTokensByLocation[location], data: alertsByLocation[location], location})
        }
    })
})
job.start();

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
        case 'FCMToken': {
            let {username, token} =  req.body.data;
            if(!username || !token){
                res.status(400).json("Username/Token must be specified!")
            }
            User.findOneAndUpdate({username: username}, {fcmToken: token}).then(() => {
                res.status(200).json("User is successfully updated!");
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
