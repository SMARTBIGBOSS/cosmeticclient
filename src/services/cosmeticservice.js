import Api from '@/services/api'

export default {
  fetchCosmetics () {
    return Api().get('/cosmetics')
  },
  fetchCosmetic (id) {
    return Api().get(`/cosmetic/${id}`)
  },
  fetchCosmeticsByHighPrice () {
    return Api().get('/cosmetics/sortByHighPrice')
  },
  fetchCosmeticsByLowPrice () {
    return Api().get('/cosmetics/sortByLowPrice')
  },
  postCosmetic () {
    return Api().post('/cosmetics/:publisher/add')
  },
  putCosmetic (id, publisher, cosmetic) {
    console.log('REQUESTING ' + cosmetic._id + ' ' +
      JSON.stringify(cosmetic, null, 5))
    return Api().put(`/cosmetics/${publisher}/${id}/edit`, cosmetic,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteCosmetic () {
    return Api().delete('/cosmetics/:publisher/:id/delete')
  }
}
