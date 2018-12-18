<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="cosmetics" :options="options">
        <a slot="order" slot-scope="props" class="fa fa-plus-circle fa-2x" @click="orderCosmetic(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import CosmeticService from '@/services/cosmeticservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
export default {
  name: 'CosmeticsList',
  data () {
    return {
      messagetitle: ' Cosmetics List ',
      cosmetics: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'name', 'brand', 'price', 'order'],
      options: {
        perPage: 10,
        filterable: ['name', 'brand'],
        sortable: ['price'],
        headings: {
          _id: 'ID',
          name: 'Name',
          brand: 'Brand',
          price: 'Price'
          // publisher: 'Seller'
        }
      }
    }
  },
  created () {
    this.loadCosmetics()
  },
  methods: {
    loadCosmetics: function () {
      CosmeticService.fetchCosmetics()
        .then(response => {
          // JSON responses are automatically parsed.
          this.cosmetics = response.data
          console.log(this.cosmetics)
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
