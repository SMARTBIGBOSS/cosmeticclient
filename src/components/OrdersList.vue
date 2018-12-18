<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="transactions" :options="options">
        <a slot="basket" slot-scope="props" class="fa fa-shopping-cart fa-2x"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import TransactionService from '@/services/transactionservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
export default {
  name: 'CosmeticsList',
  data () {
    return {
      messagetitle: ' Cosmetics List ',
      transactions: [],
      props: ['_id'],
      errors: [],
      columns: ['basket', 'cosmeId', 'quantity', 'shipping_address', 'contact_Num', 'status'],
      options: {
        perPage: 10,
        filterable: ['status'],
        headings: {
          cosmeId: 'Cosmetic ID',
          quantity: 'Quantity',
          shipping_address: 'Shipping Address',
          contact_Num: 'Contact Number',
          status: 'Status'
          // publisher: 'Seller'
        }
      }
    }
  },
  created () {
    this.loadTransactions()
  },
  methods: {
    loadTransactions: function () {
      let buyerId = sessionStorage.getItem('user')
      let token = sessionStorage.getItem('token')
      TransactionService.fetchTransactions(buyerId, token)
        .then(response => {
          // JSON responses are automatically parsed.
          this.transactions = response.data
          console.log(this.transactions)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    orderCosmetic: function (id) {
      this.$router.params = id
      // this.$router.params.publisher = publisher
      this.$router.push('/orderCosmetic')
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
</style>
