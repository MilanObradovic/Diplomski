import {User} from './models/index.js';

export function corsEnabler (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  next();
}

export const  apiRestriction =  async (req, res, next)=> {
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

export const  apiAccessLogger =  async (req, res, next)=> {
  const token = req.headers?.token;
  if(token){
    const user = await User.findOneAndUpdate({token}, {lastActivity: Date.now(), $inc: { apiAccessCounter: 1}})
    next();
  }else{
    next();
  }
}
