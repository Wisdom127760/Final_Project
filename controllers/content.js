const express = require("express");
const contentRouter = express.Router();
const { content } = require("../models/content");


contentRouter.get("/", async (req,res)=>{
    try {
        const getContent = await content.find();

    res.send({message: "content returned successfully", content });
        if (!getContent || getContent.length === 0 ){
            return res.status(404).send("No content found");
        }
        res.status(200).send(content);
    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = contentRouter;