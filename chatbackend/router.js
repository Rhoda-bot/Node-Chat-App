const express = require("express");
const router =express.Router();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const Users = require("./usersschema");
const cors = require('cors');
router.use(cors());

// const checkjwt=(req,res,next)=>{
//   let {authorization} =req.headers;
//   let token = authorization.split(' ')[1];
//   let verifyToken = jwt.verify(token, secret);
//   if (verifyToken) {
//     next();
    
//   } else {
//     res.json({fail: true})
    
    
//   }
// }
router.post('/signup',(req,res)=>{
  console.log(req.body);
 const {firstname,lastname,email,phone,password} = req.body;
  Users.create({firstname,lastname,email,phone,password},(err,msg)=>{
    if (msg) {
      res.json("success")
    } else {
      console.log(err);
    }
  });
  router.post('/signin',(req,res)=>{
    console.log(req.body.email);
    res.json(req.body)
  })

})

module.exports = router