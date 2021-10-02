const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const URI = "mongodb+srv://RhodaAnuoluwa:RhodaAnuoluwa123@cluster0.pxkf4.mongodb.net/ChatApp?retryWrites=true&w=majority"
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true}).catch(err=>{err}).then(()=>console.log('connected'));

const users = mongoose.Schema({
  firstname:{
    type:String,
    minLength:3,
    required:true
  },
  lastname:{
    type:String,
    minLength:3,
    required:true
  },
  email:{
    type:String,
    minLength:3,
    required:true
  },
  phone:{
    type:Number,
  
    required:true
  },
  password:{
    type:String,
    minLength:3
  },
  // images:{
  //   type:String
  // }
})
users.pre('save',async function (next) {
    let {password} =this;
    const salt = await bcrypt.genSalt(7);
    this.password = await bcrypt.hash(password,salt);
    next();
})
// userSchema.pre('save',async function(next){
//   let {password} = this;
//   const salt = await bcrypt.genSalt(10);
//   this.password =await bcrypt.hash(password,salt)
//   next();
// })
const Users = mongoose.model("User",users);
module.exports = Users;