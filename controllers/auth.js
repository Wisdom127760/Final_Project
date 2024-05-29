const express = require("express");
const authRouter = express.Router();
const individual = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bycrpt = require("bcrypt");

//const secretKey = crypto.randomBytes(32).toString('hex'); // Generate a random secret key

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

        user.password = await bycrpt.hash(user.password, 10);
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

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;  
    try {
      const prevUser = await individual.findOne({ email: email });
      //console.log(prevUser);
      if (!prevUser) {
        res.status(401).send({ message: "Incorrect email or password!" });
        
        return;
      }
      const isMatch = await bycrpt.compareSync(password, prevUser.password);
      if (!isMatch) {
        res.status(401).send({ message: "Incorrect email or password!" });
        return;
      }
  
      // Generate a JWT token
// Generate a JWT token
    //console.log(prevUser.role);
    const token = jwt.sign({ userId: prevUser._id, userRole: prevUser.role}, process.env.JWT_SECRET, { expiresIn: '1h'});

  
      //uses jwtwebtoken for auth
      res.status(200).send({ message: "Login Successful", token: token });
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  });
authRouter.put("/users/:_id", async (req, res) =>{
  const { _id } = req.params;
  const { firstname, lastname, email, password } = req.body;

  try{
    const user = await individual.findOne({ _id: _id });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
  }
  const updatedUser = await individual.findOneAndUpdate({ _id: _id }, { firstname, lastname, email, password }, {new:true});
  res.status(200).send({ message: "User updated successfully", updatedUser: updatedUser});
}catch(error){
  res.status(500).send({ error: true, message: error.message });

}
});
authRouter.delete("/users/:_id", async (req, res)=> {
  const { _id } = req.params;
  try{
    const user = await individual.findOne({ _id: _id });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
      }
      const deletedUser = await individual.findOneAndDelete({ _id: _id });
      res.status(200).send({ message: "User deleted successfully", deletedUser: deletedUser});
      }catch(error){
        res.status(500).send({ error: true, message: error.message });
        }

});

module.exports = authRouter;