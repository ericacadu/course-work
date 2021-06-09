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
      final_total: ''
    }
  },
  methods: {
    ...login,
    ...product,
    ...cart,
    closeModal (modal) {
      modal.hide()
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
    }
  }
}
Vue.createApp(app).mount('#app')
