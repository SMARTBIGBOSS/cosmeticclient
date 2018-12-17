<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="register">
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
              <label class="form-label" name="name">Name</label>
              <input class="form__input" type="name" placeholder="Enter Username" v-model.trim="name"/>
            </div>
            <div class="error" v-if="!$v.name.required">Name is Required</div>
            <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
              <label class="form-label" name="email">Email</label>
              <input class="form__input" type="email" placeholder="Enter Email" v-model.trim="email"/>
            </div>
            <div class="error" v-if="!$v.email.required">Email is Required</div>
            <div class="error" v-if="!$v.email.email">Email format is wrong</div>
            <div class="form-group--error" :class="{ 'form-group--error': $v.password.$error }">
              <label class="form-label" name="password">Password</label>
              <input class="form__input" type="password" placeholder="Enter Password" v-model.trim="password"/>
            </div>
            <div class="error" v-if="!$v.password.required">Password is Required</div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'" >Register Successfully!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Name or Email already exists.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Signing Up...</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SellerService from '@/services/sellerservice'
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'login',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      hint: false,
      messagetitle: ' Register ',
      submitStatus: null,
      info: null
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    register () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        let parames = {'name': this.name, 'email': this.email, 'password': this.password}
        SellerService.postSellerRegister(parames)
          .then(response => {
            this.info = response
            // console.log(this.info.data)
            if (this.info.data.data === null) {
              console.log(this.info.data.errmsg.errmsg)
              var substring = String(this.info.data.errmsg.errmsg).search('$name_1 dup key')
              console.log(substring)
              if (substring !== -1) {
                this.error = 'Name already exists'
              }
              this.submitStatus = 'ERROR'
            } else {
              this.submitStatus = 'OK'
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
