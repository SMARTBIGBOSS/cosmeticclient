import Api from '@/services/api'

export default {
  postOrder (buyerId, cosmeId, transaction, token) {
    return Api().post(`/transaction/${buyerId}/add/${cosmeId}`, transaction,
      { headers: {'Content-type': 'application/json', 'token': token} })
  },
  fetchTransactions (buyerId, token) {
    return Api().get(`/transaction/${buyerId}`,
      { headers: {'Content-type': 'application/json', 'token': token} })
  }
}
