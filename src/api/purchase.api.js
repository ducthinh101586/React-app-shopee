import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  }
}

export default purchaseApi
