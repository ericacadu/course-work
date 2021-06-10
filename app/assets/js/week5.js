/* eslint-disable no-undef */
import login from './components/login.js'
import product from './components/product.js'
import cart from './components/cart.js'
import pagination from './components/pagination.js'
import modalProduct from './components/productModal.js'
import modalDelete from './components/deleteModal.js'
import modalDetail from './components/detailModal.js'

const app = {
  components: {
    pagination,
    modalProduct,
    modalDelete,
    modalDetail
  },
  data () {
    return {
      check: true,
      status: true,
      form: {},
      user: {
        username: 'admin',
        password: 'admin'
      },
      products: [],
      modalData: {
        imagesUrl: []
      },
      modalTitle: '',
      modalText: '',
      deleteData: {},
      tempUrl: '',
      isNew: true,
      pages: {},
      productModal: {},
      deleteModal: {},
      detailModal: {},
      detailData: {},
      cart: [],
      final_total: '',
      isCheckout: false,
      order: {
        email: ''
      }
    }
  },
  methods: {
    ...login,
    ...product,
    ...cart,
    closeModal (modal) {
      modal.hide()
    },
    money (x) {
      const str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return `$${str}`
    }
  },
  mounted () {
    if (this.check === 'admin') {
      this.checkLogin()
      this.productModal = new bootstrap.Modal(document.getElementById('productModal'))
      this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    } else if (this.check === 'cart') {
      this.getUserProducts()
      this.getCarts()
      this.detailModal = new bootstrap.Modal(document.getElementById('detailModal'))
      Object.keys(VeeValidateRules).forEach(rule => {
        VeeValidate.defineRule(rule, VeeValidateRules[rule])
      })
    }
  }
}
Vue.createApp(app)
  .component('VForm', VeeValidate.Form)
  .component('VField', VeeValidate.Field)
  .component('ErrorMessage', VeeValidate.ErrorMessage)
  .mount('#app')
