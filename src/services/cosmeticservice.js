import Api from '@/services/api'

export default {
  fetchCosmetics () {
    return Api().get('/cosmetics')
  },
  fetchCosmeticsByPublisher (publisher) {
    return Api().get(`/cosmetics/${publisher}`)
  },
  fetchCosmeticsByHighPrice () {
    return Api().get('/cosmetics/sortByHighPrice')
  },
  fetchCosmeticsByLowPrice () {
    return Api().get('/cosmetics/sortByLowPrice')
  },
  postCosmetic (publisher, cosmetic, token) {
    return Api().post(`/cosmetics/${publisher}/add`, cosmetic,
      { headers: {'Content-type': 'application/json', 'token': token} })
  },
  fetchCosmetic (id) {
    return Api().get(`/cosmetic/${id}`)
  },
  putCosmetic (id, cosmetic) {
    console.log('REQUESTING ' + id + ' ' +
      JSON.stringify(cosmetic, null, 5))
    return Api().put(`/cosmetics/${id}/edit`, cosmetic,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteCosmetic (publisher, id, token) {
    return Api().delete(`/cosmetics/${publisher}/${id}/delete`,
      { headers: {'token': token} })
  }
}
