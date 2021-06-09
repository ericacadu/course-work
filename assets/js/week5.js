function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import login from './components/login.js';
import product from './components/product.js';
import cart from './components/cart.js';
import pagination from './components/pagination.js';
import modalProduct from './components/productModal.js';
import modalDelete from './components/deleteModal.js';
import modalDetail from './components/detailModal.js';
var app = {
  components: {
    pagination: pagination,
    modalProduct: modalProduct,
    modalDelete: modalDelete,
    modalDetail: modalDetail
  },
  data: function data() {
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
    };
  },
  methods: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, login), product), cart), {}, {
    closeModal: function closeModal(modal) {
      modal.hide();
    }
  }),
  mounted: function mounted() {
    if (this.check === 'admin') {
      this.checkLogin();
      this.productModal = new bootstrap.Modal(document.getElementById('productModal'));
      this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    } else if (this.check === 'cart') {
      this.getUserProducts();
      this.getCarts();
      this.detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    }
  }
};
Vue.createApp(app).mount('#app');