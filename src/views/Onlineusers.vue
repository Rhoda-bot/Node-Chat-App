<template>
  <!-- <div>
    <div class="col-6">
      <div class="title mx-auto">
        <h3>Online users</h3>
        <div v-for="(users,ind) in onlineUsers" :key="ind">
          <div v-if="users.email!==this.$route.params.email" @click="chatThisUser(users.email)">{{users.email}}</div>
        </div>
      </div>
    </div>
    <div class="col-6">
       <div class="card-header display-4">
                {{receipient}}
              </div>
              <div class="card-body">
                <div v-for="(chats,index) of chatContainer" :key="index">
                  {{chats}}
                </div>
              </div>
      <div class="card-footer">
							<div class="input-group">
								<div class="input-group-append rounded-pill">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" class="form-control type_msg rounded-pill" placeholder="Type your message..." v-model="chatbox"></textarea>
								<div class="input-group-append rounded-pill">
									<button class="input-group-text send_btn" @click="sendChat"><i class="fas fa-location-arrow"></i></button>
								</div>
							</div>
						</div>
    </div>
  </div> -->
  <section style="background-color: #CDC4F9;" class="rounded"> 
  <div class="container py-5 border-2">
    <div class="row border-2" style="#eee;">
      <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 border-right">
        <h5 class="font-weight-bold mb-3 text-center text-lg-start">Online Users</h5>
        <div class="card">
          <div class="card-body">
             <ul class="list-unstyled mb-0">
              <li class="p-2 border-bottom" style="background-color: #eee;">
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row" >
                     <!-- <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" alt="avatar"
                      class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60"> -->
                      <div class="pt-1 border-rounded" v-for="(users,ind) in onlineUsers" :key="ind">
                        <p class="fw-bold mb-0" v-if="users.email!==this.$route.params.email" @click="chatThisUser(users.email)">{{users.email}}</p>
                      </div>
                  </div>
                </div>
              </li>
             </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-7 col-xl-8">
        <div class="card">
           <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">{{receipient}}</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> 10 mins ago</p>
              </div>
               
        </div>
           <div>
                <div v-for="(chats,index) of chatContainer" :key="index">
                  {{chats}}
                </div>
          </div>
         <div class="card-footer text-muted d-flex justify-content-start align-items-center">
            <div class="input-group mb-0 pt-5">
              <input type="text" class="form-control rounded-pill" placeholder="Type message" aria-label="Recipient's username"
                aria-describedby="button-addon2" v-model="chatbox" />
                <button class="input-group-text send_btn rounded" style="padding-top: .55rem;" @click="sendChat"><i class="fas fa-location-arrow"></i></button>
              <!-- <button class="btn btn-dark rounded-pill" type="button" id="button-addon2" style="padding-top: .55rem;">
                send
              </button> -->
            </div>
          </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import axios from 'axios'
import socketclientio from 'socket.io-client'
export default {
  name:"Onlineuser",
  data:()=>({
    onlineUsers:[],
    PORT:"http://localhost:5000",
    socket:{},
    chatbox:"",
    receipient:'',
    chatContainer:[],
   
    
    
  }),
  mounted(){
   let  getuserOnline = JSON.parse(localStorage.getItem('emailuser'))
    let token = JSON.parse(localStorage.getItem("userToken"))
    axios.get("http://localhost:5000/contacts",{
      headers:{
        "authorization":`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data)
    })
    let socket = socketclientio(this.PORT);
    this.socket = socket;
    this.socket.on('messages',res=>{
      console.log(res);
    })
    this.socket.emit('onlineusers', getuserOnline);
    // this.socket.emit('onlineusers',(this.$route.params.email))
    this.socket.on('onlineusers',res=>{
      this.onlineUsers = res;
      console.log(this.onlineUsers)
    })
    this.getmeassage()
  },
  methods: {
     chatThisUser(a){
      this.receipient= a;
      // localStorage.setItem
      // this.socket.emit('onlineusers',this.getuserOnline);
      // localStorage.setItem('chatUser', this.receipient)
      console.log(this.receipient);
     
    },
    sendChat(){
      // console.log(this.chatbox)
      let {receipient,chatbox} = this
      console.log(receipient);
     this.socket.emit('chatMsg',{receipient,chatbox})
       this.getmeassage();
    },
    getmeassage(){
      this.socket.on('messages',res=>{
        this.chatContainer = res
        console.log(this.chatContainer);

    })
    }
   
  },
}
</script>