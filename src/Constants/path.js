// export const path = {
//   home: '/',
//   login: '/login',
//   register: '/register',
//   product: '/product',
//   productDetail: '/product/:idProduct',
//   cart: '/cart',
//   user: '/user',
//   get profile() {
//     return this.user + '/profile'
//   },

//   get password() {
//     return this.user + '/password'
//   },

//   get purchase() {
//     return this.user + '/purchase'
//   },

//   notfound: '*'
// }

class Path {
  constructor() {
    this.home = '/'
    this.login = '/login'
    this.register = '/register'
    this.product = '/product'
    this.productDetail = '/product/:idProduct'
    this.cart = '/cart'
    this.user = '/user'
    this.profile = '/profile'
    this.password = '/password'
    this.purchase = '/purchase'
    this.notfound = '*'
  }
}

export const path = new Path()
