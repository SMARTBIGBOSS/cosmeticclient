import Api from '@/services/api'

export default {
  postSeller (parame) {
    return Api().post('/seller/login', parame)
  },
  postNewSeller () {
    return Api().post('/seller/signUp')
  }
}
