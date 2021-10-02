<template>
  <div class="container">
    <div class="row ">
      <div class="col-5  mx-auto border-rounded pt-3 shadow" style="background-color: #eee;">
        <div class="card-block">

    <!--Header-->
    <div class="text-center">
        <h3><i class="fa fa-lock"></i> Login:</h3>
        <hr class="mt-2 mb-2">
    </div>

    <!--Body-->
    <form action=""  @submit.prevent="handleSignin">
    <div class="md-form">
        <i class="fa fa-envelope prefix"></i>
        <input type="text" id="form2" class="form-control" v-model="email">
        <label for="form2">Your email</label>
    </div>

    <div class="md-form">
        <i class="fa fa-lock prefix"></i>
        <input type="password" id="form4" class="form-control" v-model="password">
        <label for="form4">Your password</label>
    </div>

    <div class="text-center">
        <button class="btn btn-dark btn-block rounded-pill" type="submit"  value="Submit">Login</button>
    </div>
   </form>
</div>

<!--Footer-->
<div class="modal-footer">
    <div class="options">
        <p>Not a member? <a href="#">Sign Up</a></p>
        <p>Forgot <a href="#">Password?</a></p>
    </div>
</div>
<!--Naked Form-->
      </div>
    </div>
  </div>
  <!-- <div>
          <h2>Sign in Page</h2>
     <div class="container">
      <div class="row col-sm-7 mx-auto shadow rounded pt-4 pb-3 border-success" >
       <div class="col-md-6">
          <form @submit.prevent="handleSignin">
           <div class="form-group">
          <input type="text" class="form-control" v-model="email">
        </div>
         <div class="form-group">
          <input type="text" class="form-control" v-model="password">
        </div>
         <div class="form-group">
          <input type="submit" class="btn btn-success btn-block rounded-pill"  value="Submit">
        </div>
        </form>
       </div>
       <div class="col-sm-6">
      
         
       </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import axios from 'axios';
import socketclientio from 'socket.io-client';
export default {
  name:'Signin',
  data:()=>({
    email:'',
    password:'',
    PORT:'http://localhost:5000',
    socket:{},
    messages:[]
  }),
  mounted() {
    let socket = socketclientio(this.PORT);
    this.socket = socket;
  
  },
  methods:{
    handleSignin(){
      let {email,password} = this;
      axios.post("http://localhost:5000/login",{email,password}).then(res=>{
      localStorage.setItem("userToken",JSON.stringify(res.data.res));
      if (res.data.res=="invalid email or password" || res.data.res==false) {
        console.log("hello");
         console.log(res.data.res);
       }else{
         localStorage.setItem('emailuser', JSON.stringify(email))
      
        this.$router.push(`/onlineusers/${email}`);
      
       }
      }).catch(err=>{
        console.log(err);
      })
    },
 
  }                      
}
</script>
<style scoped>

</style>