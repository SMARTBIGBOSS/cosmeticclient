<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-plus-square" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <add-cosmetic-form :cosmetic="cosmetic" cosmeticBtnTitle="Add Cosmetic"
                         @cosmetic-is-created-updated="submitCosmetic"></add-cosmetic-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import CosmeticService from '@/services/cosmeticservice'
import CosmeticForm from '@/components/CosmeticForm'

export default {
  data () {
    return {
      cosmetic: {name: '', brand: '', price: 0.0, publisher: sessionStorage.getItem('user')},
      messagetitle: ' Add Cosmetic '
    }
  },
  components: {
    'add-cosmetic-form': CosmeticForm
  },
  methods: {
    submitCosmetic: function (cosmetic) {
      var token = sessionStorage.getItem('token')
      CosmeticService.postCosmetic(this.cosmetic.publisher, cosmetic, token)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
