import Api from '@/services/api'

export default {
  postCustomerLogin (parame) {
    return Api().post('/customer/login', parame)
  },
  postCustomerRegister (parame) {
    return Api().post('/customer/signUp', parame)
  }
}
