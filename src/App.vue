<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/logo.jpg" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Cosmetics Web App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px" @click="login"> Home</i></b-nav-item>
            <b-nav-item to="/cosmetics/publisher" v-if="(roletype === 'Seller')" @click="login"><i class="fa fa-list" style="padding: 5px"> Manage Cosmetics</i></b-nav-item>
            <b-nav-item to="/cosmetics/publisher/add" v-if="(roletype === 'Seller')" @click="login"><i class="fa fa-plus-square" style="padding: 5px"> Add Cosmetics</i></b-nav-item>
            <b-nav-item to="/cosmetics" v-if="(roletype !== 'Seller')" @click="login"><i class="fa fa-list" style="padding: 5px"> Cosmetics List</i></b-nav-item>
            <b-nav-item to="/orders" v-if="(roletype !== 'Seller')" @click="login"><i class="fa fa-list" style="padding: 5px"> Orders List</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/register" ><i class="fa fa-sign-in" style="padding: 5px"> Register </i></b-nav-item>
          <b-nav-item to="/login" v-if="(islogin === false)" @click="login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/logout" v-if="(islogin !== false)" @click="logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      islogin: '',
      roletype: sessionStorage.getItem('role')
    }
  },
  methods: {
    changeLoginShow () {
      this.islogin = false
      // this.$router.push('/login')
    },
    login () {
      this.islogin = true
      // this.$router.push('/login')
    },
    logout () {
      if (sessionStorage.getItem('token') === null) {
        this.$swal('Logout', 'You should login first ', 'info')
        this.islogin = false
        this.$router.push('/')
      } else {
        this.$swal({
          title: 'Logout',
          text: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value)
          if (result.value === true) {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('role')
            this.islogin = false
            // sessionStorage.setItem('isLogin', false)
            this.$swal('Logout', 'You successfully logout ', 'success')
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else {
            console.log('SWAL Else Result : ' + result.value)
            this.$swal('Cancelled', 'You still in logging status!', 'info')
          }
        })
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 20px;
    background: url("./assets/background.jpg") no-repeat center top;
    background-positio: fixed;
    background-size: 100% 100%;
  }
  #imagezoom {
    width:100%;
    height: 100%;
    position: fixed;
  }
  .VueTables__sortable {
    cursor: pointer;
  }
</style>
