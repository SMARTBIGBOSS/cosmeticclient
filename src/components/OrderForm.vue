<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Cosmetic name: {{ name }}</label>
    </div>

    <div class="form-group">
      <label class="form-label" name="brand">Brand: {{brand}}</label>
    </div>

    <div class="form-group">
      <label class="form-control-label" name="price">Price: {{price}}</label>
    </div>

    <div class="form-group" :class="{ 'form-group--error': $v.quantity.$error }">
      <label class="form-control-label" name="quantity">Quantity</label>
      <input class="form__input" type="decimal" v-model.trim="quantity"/>
    </div>
    <div class="error" v-if="!$v.quantity.required">Quantity is Required</div>
    <div class="error" v-if="!$v.quantity.minValue">Quantity must be at least one</div>

    <div class="form-group" :class="{ 'form-group--error': $v.shipping_address.$error }">
      <label class="form-control-label" name="shipping_address">Shipping Address</label>
      <input class="form__input" type="text" v-model.trim="shipping_address" />
    </div>
    <div>
      <googlemap @location="showAddress"></googlemap>
    </div>
    <div class="error" v-if="!$v.shipping_address.required">Shipping Address is Required</div>

    <div class="form-group" :class="{ 'form-group--error': $v.contact_Num.$error }">
      <label class="form-control-label" name="contact_Num">Contact Number</label>
      <input class="form__input" type="decimal" v-model.trim="contact_Num"/>
    </div>
    <div class="error" v-if="!$v.contact_Num.required">Contact Number is Required</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ orderBtnTitle }}</button>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Order a Cosmetic Successfully!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Ordering...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators'
import GoogleMap from '@/components/GoogleMap'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'OrderData',
  props: ['orderBtnTitle', 'cosmetic'],
  data () {
    return {
      transaction: {},
      messagetitle: ' Order Cosmetic ',
      cosmeId: this.$router.params,
      buyerId: sessionStorage.getItem('user'),
      name: this.cosmetic.name,
      brand: this.cosmetic.brand,
      price: this.cosmetic.price,
      quantity: 1,
      contact_Num: '',
      shipping_address: '',
      submitStatus: null
    }
  },
  validations: {
    quantity: {
      required,
      minValue: minValue(1)
    },
    contact_Num: {
      required
    },
    shipping_address: {
      required
    }
  },
  components: {
    'googlemap': GoogleMap
  },
  methods: {
    showAddress (location) {
      this.shipping_address = location
      console.log('aaa' + location)
    },
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var transaction = {
            cosmeId: this.cosmeId,
            buyerId: this.buyerId,
            quantity: this.quantity,
            contact_Num: this.contact_Num,
            shipping_address: this.shipping_address
          }
          this.transaction = transaction
          console.log('Submitting in OrderForm : ' +
              JSON.stringify(this.transaction, null, 5))
          this.$emit('order-is-created', this.transaction)
        }, 500)
        setTimeout(() => {
          this.$router.push('/orders')
        }, 1000)
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
