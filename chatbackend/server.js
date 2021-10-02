let arr = []
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const router = require("./router");
const  server  = http.createServer(app);
const Users = require("./usersschema")
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(cors());
const secret = "rhodaomolomotiowaayemoya";
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))
const io  = socketio(server,{
  cors:{  
    origin:"http://localhost:8080",
    methods:['GET','POST']
  }
})
// cors({origin:"http://localhost:8080"});
const allUsers = [];
const msgArr = [];
app.use(router);
app.get("/",(req,res)=>{
  console.log("hi");
  res.send("hello world");
})
const checkjwt=(req,res,next)=>{
  let {authorization} =req.headers;
  let token = authorization.split(' ')[1];
  let verifyToken = jwt.verify(token, secret);
  if (verifyToken) {
    next();
    
  } else {
    res.json({fail: true})
    
    
  }
}
app.post("/login",async(req, res)=>{
 
  const a = await Users.find({email:req.body.email});

  if (a.length == 0) {
  
    res.json({res:false})
  }else {
    let claims = {id:a[0]._id,email:a[0].email};
    let token = jwt.sign(claims,secret);
    bcrypt.compare(req.body.password,a[0].password,function (err,msg) {
      if (msg==true) {
        res.json({res:token})
      }else{
        console.log(msg);
        res.json({res:"Invalid email or password"});
      }
    })
  }
   
})
//  /contacts is getting all registered users from the database//

app.get("/contacts",checkjwt,async (req,res)=>{
  let a =await Users.find();
  res.json(a)
})

//  /contacts is getting all registered users from the database//


// socket connectio //
io.on("connection", socket=>{

  // just testing weather socket has been connected
  socket.emit("message","hello guy!");
   // just testing weather socket has been connected //

   // onlineusers is getting all connected users, taking in their 
   // email as a unique id, then saving it in an array. also 
   // checking is a user already exist not to bother adding it again to the global array
 socket.on('onlineusers',(email)=>{
  let obj ={email,id:socket.id}
   let filterOnlineUsers = allUsers.filter(resp=>resp.email == email);
   console.log(allUsers)
    let findUsers = allUsers.find(resp => resp.email == email);
     let indexuser = filterOnlineUsers.indexOf(findUsers);
     
    if (filterOnlineUsers.length >=1) {
      allUsers[indexuser]=findUsers
    }else{
      allUsers.push(obj);
    }
  
  // this is sending back the connected users 
  // allUsers is the global array in which all connected users are been save
   socket.emit('onlineusers', allUsers);
    
 })
 // chatMsg is taking messages from params of two things one is the message we want to send to the receipient or receiver and the receiver's email
 socket.on('chatMsg',(res)=>{
  console.log(res);
 let userArr = allUsers.filter(e => (e.email == res.receipient))
 let id = userArr[0].id;
 // this will send the res.chabox which is the message coming from the frontend to the receiver with the particular id
 socket.to(id).emit('messages',res.chatbox)
 console.log(id,res.chatbox)
//  msgArr.push({})
})
})

// socket connection // 

server.listen(PORT,()=>{
  console.log(`server is listening on http://localhost:${PORT}`);
})