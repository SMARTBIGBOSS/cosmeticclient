<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="cosmetics" :options="options">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editCosmetic(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteCosmetic(props.row._id)"></a>
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
  name: 'Cosmetics',
  data () {
    return {
      messagetitle: ' Cosmetics Management ',
      cosmetics: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'name', 'brand', 'price', 'edit', 'remove'],
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
  // Fetches Donations when the component is created.
  created () {
    this.loadCosmetics()
  },
  methods: {
    loadCosmetics: function () {
      var publisher = sessionStorage.getItem('user')
      CosmeticService.fetchCosmeticsByPublisher(publisher)
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
    sortByHighPrice: function () {
      CosmeticService.fetchCosmeticsByHighPrice()
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
    sortByLowPrice: function () {
      CosmeticService.fetchCosmeticsByLowPrice()
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
    editCosmetic: function (id) {
      this.$router.params = id
      // this.$router.params.publisher = publisher
      this.$router.push('/edit')
    },
    deleteCosmetic: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          var publisher = sessionStorage.getItem('user')
          var token = sessionStorage.getItem('token')
          CosmeticService.deleteCosmetic(publisher, id, token)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadCosmetics()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Donation ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Cosmetic still save!', 'info')
        }
      })
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
