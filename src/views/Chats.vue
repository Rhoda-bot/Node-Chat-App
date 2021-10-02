
<template>
  <div>
    <h2>Chat Page</h2>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div v-for="(contact,index) of contacts" :key="index" class="shadow border-bottom border display-4">
           <div v-if="contact.email!==this.$route.params.email">
              
              <div  @click="handleReceipt(contact.firstname)">{{contact.firstname}}</div>
           </div>
          </div>
        </div>
        <div class="col-sm-6 pt-4 py-3 border-left float-right clear-fix" id="inp">
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
      </div>
    </div>
  </div>
</template>
<script>
import socketclientio from 'socket.io-client';
import axios from 'axios';

export default {
  name:'Chats',
  data(){
    return{
      PORT:'http://localhost:5000',
      socket:{},
      messages:[],
      contacts:[],
      receipient:"",
      chatbox:"",
      chatContainer:[]
    }
  },
  mounted(){
    let socket = socketclientio(this.PORT);
    this.socket = socket;
    let token = JSON.parse(localStorage.getItem("userToken"))
    axios.get("http://localhost:5000/contacts",{
      headers:{
        'authorization':`Bearer ${token}`
      }
    }).then(res=>
      this.contacts=(res.data)
    ).catch(err=>{
      console.log(err)
    })
    this.socket.emit('sendMsg',(this.$route.params.email,this.receipient,this.chatbox))

   
  },
  methods:{
    handleReceipt(arg){
    this.receipient=arg
  },
  sendChat(){
    this.chatContainer.push(this.chatbox);
    this.socket.on("onlineusers", res => {
      console.log(res);
    })
    this.chatbox=""
  }
  }
}
</script>
<style scoped>

</style>
 