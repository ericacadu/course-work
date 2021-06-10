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
        email: '',
        name: '',
        tel: '',
        address: ''
      },
      userMessage: '',
      spinItem: ''
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
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
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
  },
  created () {
    Object.keys(VeeValidateRules).forEach(rule => {
      if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule])
      }
    })
    VeeValidateI18n.loadLocaleFromURL('./zh_tw.json')
    VeeValidate.configure({
      generateMessage: VeeValidateI18n.localize('zh_TW'),
      validateOnInput: true
    })
  }
}
Vue.createApp(app)
  .component('VForm', VeeValidate.Form)
  .component('VField', VeeValidate.Field)
  .component('ErrorMessage', VeeValidate.ErrorMessage)
  .mount('#app')
