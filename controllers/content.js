const express = require("express");
const contentRouter = express.Router();
const myContent= require("../models/content");


contentRouter.get("/:_id", async (req,res)=>{
    const {_id} = req.params;

    try {
        const getContent = await myContent.find({_id});
        if (getContent){
            res.status(200).send({message: "Content returned successfully", data: getContent });
        }else{
            
            res.status(204).send({message: "Content not found"});
        }
    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

contentRouter.post("/", async (req, res)=>{
    const {title, description, content, author, category, tags, publishDate} = req.body;

    try { 
       const newContent = new myContent({title, description, content, author, category, tags, publishDate});
       const response = await newContent.save();
       if (response){
        res.status(201).send({message :"Content created succesfully!", data: newContent});
       }else{
        res.status(400).send("Content not created");
       }  
    }catch(error){
        res.status(500).send({error: true, message: error.message})
    }
});



module.exports = contentRouter;