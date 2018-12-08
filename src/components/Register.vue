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
import SellerService from '@/services/SellerService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
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
