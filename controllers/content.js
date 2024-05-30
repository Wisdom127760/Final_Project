const express = require("express");
const contentRouter = express.Router();
const myContent= require("../models/content");
const individual = require("../models/user");


contentRouter.get("/:_id", async (req,res)=>{
    const userId = req.params;

    try {
        const getContent = await myContent.find({userId});
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
    const cms = req.body;
    try { 
     cms.author  = req.userId;
      console.log(cms.author);
       const newContent = new myContent(cms);
       const response = await newContent.save();
       if (response){
        res.status(201).send({message :"Content created succesfully!", data: newContent});
       }else{
        res.status(400).send("Content not created");
       }  
    }catch(error){
        res.status(500).send({error: true, message: error.message});
    }
});

contentRouter.put("/:_id", async (req, res) =>{
    const { _id } = req.params;
    const { title, description, content, author, category, tags, publishDate } = req.body;
  
    try{
      const findContId = await myContent.findOne({_id });
      if (!findContId) {
        res.status(404).send({ message: "Content with ID not found" });
        return;
    }
    const updatedContent = await myContent.findOneAndUpdate({_id }, { title, description, content, author, category, tags, publishDate }, {new:true});
    res.status(200).send({ message: "Content updated successfully", updatedContent: updatedContent});
  }catch(error){
    res.status(500).send({ error: true, message: error.message });
  }
  });

contentRouter.delete("/:_id", async (req, res)=> {
    const { _id } = req.params;
    try{
      const findContId = await myContent.findOne({ _id });
      if (!findContId) {
        res.status(404).send({ message: "Content with ID not found" });
        return;
        }
        const deletedContent = await myContent.findOneAndDelete({_id });
        res.status(200).send({ message: "Content deleted successfully", deletedContent: deletedContent});
        }catch(error){
          res.status(500).send({ error: true, message: error.message });
          }
});


module.exports = contentRouter;