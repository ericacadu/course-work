"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = 'https://vue3-course-api.hexschool.io';
var path = 'bistro';
var productModal = {};
var deleteModal = {};
var app = {
  data: function data() {
    return {
      check: true,
      status: '',
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
      isNew: true
    };
  },
  methods: {
    signin: function signin() {
      var api = "".concat(url, "/admin/signin");

      if (this.user.username === 'admin' && this.user.password === 'admin') {
        this.form = {
          username: 'bistro@gmail.com',
          password: 'bistro'
        };
      } else {
        this.form = this.user;
      }

      axios.post(api, this.form).then(function (res) {
        if (!res.data.success) {
          alert(res.data.message);
        }

        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired;
        document.cookie = "bistroToken=".concat(token, "; expires=").concat(new Date(expired));
        location.assign('product.html');
      })["catch"](function (err) {
        console.log(err);
      });
    },
    logout: function logout() {
      axios.post("".concat(url, "/logout")).then(function (res) {
        if (res.data.success) {
          document.cookie = "bistroToken= ; expires=".concat(new Date());
          location.assign('./');
        } else {
          alert(res.data.message);
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    checkLogin: function checkLogin() {
      var _this = this;

      var token = document.cookie.replace(/(?:(?:^|.*;\s*)bistroToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      axios.post("".concat(url, "/api/user/check")).then(function (res) {
        if (res.data.success) {
          _this.status = true;

          _this.getProducts();
        } else {
          _this.status = false;
          alert(res.data.message);
          location.assign('./');
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    getProducts: function getProducts() {
      var _this2 = this;

      var api = "".concat(url, "/api/").concat(path, "/admin/products");
      axios.get(api).then(function (res) {
        if (res.data.success) {
          _this2.products = res.data.products; 
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    updateProduct: function updateProduct() {
      var _this3 = this;

      var vm = this;
      var api = '';
      var method = '';

      if (vm.isNew === true) {
        method = 'post';
        api = "".concat(url, "/api/").concat(path, "/admin/product");
      } else {
        method = 'put';
        api = "".concat(url, "/api/").concat(path, "/admin/product/").concat(vm.modalData.id);
      }

      axios[method](api, {
        data: vm.modalData
      }).then(function (res) {
        if (res.data.success) {
          _this3.getProducts();
        } else {
          alert(res.data.message);
        }

        _this3.closeModal(productModal);
      })["catch"](function (err) {
        console.log(err);
      });
    },
    deleteProduct: function deleteProduct(id) {
      var _this4 = this;

      var api = "".concat(url, "/api/").concat(path, "/admin/product/").concat(id);
      axios["delete"](api).then(function (res) {
        if (!res.data.success) {
          alert(res.data.message);
        }

        console.log("\u5DF2\u522A\u9664".concat(_this4.deleteData.title, "\u5546\u54C1"));

        _this4.getProducts();

        _this4.closeModal(deleteModal);
      })["catch"](function (err) {
        console.log(err);
      });
    },
    uploadImage: function uploadImage() {
      if (this.tempUrl.trim() !== '') {
        this.modalData.imagesUrl.push(this.tempUrl);
        this.tempUrl = '';
      } else {
        alert('請輸入連結網址');
      }
    },
    removeImage: function removeImage(item, key) {
      var result = this.modalData.imagesUrl.filter(function (img, idx) {
        return key !== idx;
      });
      this.modalData.imagesUrl = result;
    },
    updateTabs: function updateTabs() {
      var pills = document.querySelectorAll('.nav-pills .nav-link');
      var panes = document.querySelectorAll('.tab-pane');

      var changeTab = function changeTab(elemt) {
        elemt.forEach(function (item) {
          return item.classList.remove('active');
        });
        elemt[0].classList.add('active');
        elemt[0].classList.add('show');
      };

      changeTab(pills);
      changeTab(panes);
    },
    openModal: function openModal(isNew, item) {
      this.modalData = {
        category: '選擇類別',
        unit: '選擇單位',
        imagesUrl: []
      };
      this.tempUrl = '';

      if (isNew === true) {
        this.isNew = true;
        this.modalTitle = '新增商品';
      } else {
        this.isNew = false;
        this.modalTitle = '編輯商品';
        this.modalData = JSON.parse(JSON.stringify(item));

        if (this.modalData.imagesUrl === undefined) {
          this.modalData.imagesUrl = [];
        }
      }

      productModal.show();
      this.updateTabs();
    },
    alertModal: function alertModal(item) {
      this.deleteData = _objectSpread({}, item);
      this.modalTitle = '刪除商品';
      this.modalText = '商品';
      deleteModal.show();
    },
    closeModal: function closeModal(modal) {
      modal.hide();
    }
  },
  mounted: function mounted() {
    if (this.check === true) {
      this.checkLogin();
      productModal = new bootstrap.Modal(document.getElementById('productModal'));
      deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    }

    return this.modalData;
  }
};
Vue.createApp(app).mount('#app');