import Api from '@/services/api'

export default {
  postSellerLogin (parame) {
    return Api().post('/seller/login', parame)
  },
  postSellerRegister (parame) {
    return Api().post('/seller/signUp', parame)
  }
}
