const joi=require('joi');
const router = require('express').Router();
const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).send({
            error:error.details[0].message
    });
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().required().email(),
        password:joi.string().required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).send({
            error:error.details[0].message});
    }
    next();
}

module.exports={signupValidation,loginValidation};
