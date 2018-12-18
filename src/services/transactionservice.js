import Api from '@/services/api'

export default {
  postOrder (buyerId, cosmeId, transaction, token) {
    return Api().post(`/transaction/${buyerId}/add/${cosmeId}`, transaction,
      { headers: {'Content-type': 'application/json', 'token': token} })
  }
}
