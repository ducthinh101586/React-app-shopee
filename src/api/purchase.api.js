import { purchaseStatus } from '../Constants/status'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  getCartPurchases(data) {
    return http.get(URL, {
      params: {
        status: purchaseStatus.incart
      }
    })
  }
}

export default purchaseApi
