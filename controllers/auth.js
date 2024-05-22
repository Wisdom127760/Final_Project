const express = require("express");
const authRouter = express.Router();
const individual = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bycrpt = require("bcrypt");

authRouter.get("/users", async (req,res)=>{
    try {
        const users = await individual.find();

        if (!users || users.length === 0 ){
            return res.status(404).send("No users found");
        }
        res.status(200).send(users);
    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
authRouter.post("/signUp", async (req,res)=>{
    const user = req.body;

    try {
        
        const prevUser = await individual.findOne({email: user.email});
        
        if(prevUser){
            res.status(400).send({message:"User already exist"});
            return;
        }

        individual.password = await bycrpt.hash(individual.password, 10);
        const newUser = new individual(user);
        const reponse = await newUser.save();

        if (reponse){
            res.status(201).send({message:"User created successfully"});
        }else
        {
            res.status(400).send({message: "User SignUp Failed"});
        }
    }catch(error){
        res.status(500).send({error: true, message: error.message})
    }
});



module.exports = authRouter;