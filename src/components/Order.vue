<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <order-form :cosmetic="cosmetic" orderBtnTitle="Order Cosmetic"
                           @order-is-created="orderCosmetic"></order-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import CosmeticService from '@/services/cosmeticservice'
import TransactionService from '@/services/transactionservice'
import OrderForm from '@/components/OrderForm'

export default {
  data () {
    return {
      cosmetic: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Order Cosmetic '
    }
  },
  components: {
    'order-form': OrderForm
  },
  created () {
    this.getCosmetic()
  },
  methods: {
    getCosmetic: function () {
      console.log(this.$router.params)
      CosmeticService.fetchCosmetic(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.cosmetic = response.data
          this.childDataLoaded = true
          console.log('Getting Cosmetic in Edit: ' + JSON.stringify(this.cosmetic, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    orderCosmetic: function (transaction) {
      console.log('Before PUT ' + JSON.stringify(transaction, null, 5))
      let buyerId = transaction.buyerId
      let cosmeId = transaction.cosmeId
      let token = sessionStorage.getItem('token')
      TransactionService.postOrder(buyerId, cosmeId, transaction, token)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(transaction, null, 5))
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
