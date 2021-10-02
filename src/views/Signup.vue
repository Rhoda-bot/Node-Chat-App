<template lang="">
  <div>
    <h2>Sign up Page</h2>
    <div class="container">
      <div class="row col-sm-7 mx-auto shadow rounded pt-4 pb-3 border-success">
        <div class="col-6">
          <form  @submit.prevent="handleForm">
            <div class="form-group">
             <input v-model="firstname" placeholder="Firstname" type="text" class="form-control sm-6"/>
            </div>
            <div class="form-group">
             <input v-model="lastname" placeholder="Lastname" type="text" class="form-control sm-6"/>
            </div>
            <div class="form-group">
             <input v-model="email" type="text" placeholder="Email" class="form-control sm-6"/>
            </div>
            <div class="form-group">
             <input v-model="phone" type="text" placeholder="Phone" class="form-control sm-6"/>
            </div>
            <div class="form-group">
             <input v-model="password" type="password" placeholder="Password" class="form-control sm-6"/>
            </div>
            <!-- <div class="form-group">
             <input type="file" @change="myFile($event)" class="form-control sm-6"/>
            </div> -->
            <div class="form-group">
              <input type="submit" class="btn btn-success btn-block rounded-pill" value="Submit">
            </div>
          </form>
        </div>
      </div>
    </div>
    <button @click="testBack">test backend</button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'Signup',
  data(){
    return{
      firstname:'',
      lastname:'',
      email:'',
      phone:'',
      password:'',
      // images:[]
    }
  },
  methods:{
    handleForm(){
     
     const  {firstname,lastname,email,phone,password} = this;
      axios.post("http://localhost:5000/signup",{firstname,lastname,email,phone,password}).then(res=>{console.log(res.data)})
    },
    testBack(){
      console.log("something")
      axios.get("http://localhost:5000/testback").then(res=>{console.log(res)})

    }
   
  },
 
}
</script>