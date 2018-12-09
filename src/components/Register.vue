<template>
  <div class="text-md-center">
    <h2>Register</h2>
    <v-layout >
      <v-flex xs6 offset-xs3>
        <v-text-field label="Name" single-line v-model="name"></v-text-field>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password"></v-text-field>

        <v-btn class="mb-3" success @click="register">Register</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService'
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
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      email
    }
  },
  methods: {
    register: function () {
      SellerService.postNewSeller()
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>
