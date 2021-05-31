function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import pagination from './pagination.js';
var url = 'https://vue3-course-api.hexschool.io';
var path = 'bistro';
var productModal = {};
var deleteModal = {};
var app = {
  components: {
    pagination: pagination
  },
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
      isNew: true,
      pages: {}
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

      var token = document.cookie.replace(/(?:(?:^|.*;\s*)bistroToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
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

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var api = "".concat(url, "/api/").concat(path, "/admin/products?page=").concat(page);
      axios.get(api).then(function (res) {
        if (res.data.success) {
          _this2.products = res.data.products;
          _this2.pages = res.data.pagination;
          console.log(_this2.pages);
        }
      })["catch"](function (err) {
        console.log(err);
      });
    },
    updateProduct: function updateProduct(modalData) {
      var _this3 = this;

      var vm = this;
      var api = '';
      var method = '';

      if (vm.isNew === true) {
        method = 'post';
        api = "".concat(url, "/api/").concat(path, "/admin/product");
      } else {
        method = 'put';
        api = "".concat(url, "/api/").concat(path, "/admin/product/").concat(modalData.id);
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
Vue.createApp(app).component('productModal', {
  template: "\n    <div class=\"modal fade\" id=\"productModal\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content border-0\">\n          <div class=\"modal-header\">\n            <div class=\"modal-title\">{{ modalTitle }}</div>\n            <span class=\"material-icons close\"\n            data-bs-dismiss=\"modal\"\n            role=\"button\">clear</span>\n          </div>\n          <div class=\"modal-body\">\n            <ul class=\"nav nav-pills\" role=\"tablist\">\n              <li class=\"nav-item\">\n                <button class=\"nav-link active\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#basic\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u8CC7\u8A0A</button>\n              </li>\n              <li class=\"nav-item\">\n                <button class=\"nav-link\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#info\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u5167\u5BB9</button>\n              </li>\n              <li class=\"nav-item\">\n                <button class=\"nav-link\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#photo\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u5716\u7247</button>\n              </li>\n            </ul>\n            <div class=\"tab-content mt-2\">\n              <div class=\"tab-pane fade show active\" id=\"basic\" role=\"tabpanel\">\n                <div class=\"form-row d-flex\">\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"name\">\u540D\u7A31</label>\n                      <input\n                        type=\"text\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u5546\u54C1\u540D\u7A31\"\n                        id=\"name\"\n                        v-model=\"modalData.title\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"category\">\u985E\u5225</label>\n                      <select\n                        id=\"category\"\n                        class=\"form-select text-secondary form-control w-90\"\n                        v-model=\"modalData.category\"\n                      >\n                        <option value=\"\u9078\u64C7\u985E\u5225\" selected disabled>\u9078\u64C7\u985E\u5225</option>\n                        <option value=\"\u8ABF\u9152\">\u8ABF\u9152</option>\n                        <option value=\"\u679C\u6C41\">\u679C\u6C41</option>\n                        <option value=\"\u8336\u98F2\">\u8336\u98F2</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-row d-flex\">\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"origin_price\">\u539F\u50F9</label>\n                      <input\n                        type=\"text\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u539F\u50F9\"\n                        id=\"origin_price\"\n                        v-model.number=\"modalData.origin_price\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"price\">\u552E\u50F9</label>\n                      <input\n                        type=\"text\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u552E\u50F9\"\n                        id=\"price\"\n                        v-model.number=\"modalData.price\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"unit\">\u55AE\u4F4D</label>\n                      <select\n                        id=\"unit\"\n                        class=\"form-select text-secondary form-control w-90\"\n                        v-model=\"modalData.unit\"\n                      >\n                        <option value=\"\u9078\u64C7\u55AE\u4F4D\" selected disabled>\u9078\u64C7\u55AE\u4F4D</option>\n                        <option value=\"\u676F\">\u676F</option>\n                        <option value=\"\u58FA\">\u58FA</option>\n                        <option value=\"\u7F50\">\u7F50</option>\n                      </select>\n                    </div>\n                  </div>\n                  <hr />\n                  <div class=\"form-row d-flex\">\n                    <label class=\"\" for=\"switch\">\u662F\u5426\u555F\u7528</label>\n                    <div class=\"switch-group\">\n                      <input type=\"checkbox\" id=\"switch\"\n                      v-model=\"modalData.is_enable\"\n                      :checked=\"modalData.is_enable\">\n                      <div class=\"ico_switch\"></div>\n                    </div>\n                  </div>\n              </div>\n              <div class=\"tab-pane fade\" id=\"info\" role=\"tabpanel\">\n                <div class=\"form-group w-100\">\n                  <label class=\"py-2\" for=\"description\">\u5546\u54C1\u63CF\u8FF0</label>\n                  <textarea\n                    row=\"3\"\n                    class=\"form-control\"\n                    placeholder=\"\u8F38\u5165\u5546\u54C1\u63CF\u8FF0\"\n                    id=\"description\"\n                    v-model=\"modalData.description\"\n                  ></textarea>\n                </div>\n                <div class=\"form-group w-100\">\n                  <label class=\"py-2\" for=\"info\">\u8AAA\u660E\u5167\u5BB9</label>\n                  <textarea\n                    row=\"3\"\n                    class=\"form-control\"\n                    placeholder=\"\u8F38\u5165\u5546\u54C1\u5167\u5BB9\"\n                    id=\"info\"\n                    v-model=\"modalData.content\"\n                    ></textarea>\n                </div>\n              </div>\n              <div class=\"tab-pane fade\" id=\"photo\" role=\"tabpanel\">\n                <div class=\"form-group d-flex justify-content-start\">\n                  <div class=\"imgs-empty\"\n                  v-if=\"!modalData.imagesUrl.length\"\n                  v-for=\"(img, i) in 3\" :key=\"i\">\n                  <span class=\"material-icons\">photo</span>\n                </div>\n\n                  <div class=\"imgs-fill\"\n                  v-else \n                  v-for=\"(img, key) in modalData.imagesUrl\"\n                  :key=\"key\"> \n                    <span class=\"material-icons\" role=\"button\"\n                    @click=\"removeImage(img, key)\">\n                      remove\n                    </span>\n                    <img class=\"img-thumbnail\" :src=\"img\" alt=\"\">\n                  </div> \n                </div>\n                <div class=\"form-group\">\n                  <label class=\"py-2\" for=\"imagesUrl\">\u5716\u7247\u9023\u7D50</label>\n                  <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\"\n                    placeholder=\"\u8F38\u5165\u5716\u7247\u9023\u7D50\"\n                    v-model=\"tempUrl\"\n                    :disabled=\"modalData.imagesUrl.length >= 3\">\n                    <button class=\"btn btn-outline-secondary\"\n                    :disabled=\"modalData.imagesUrl.length >= 3\"\n                    @click=\"uploadImage\">\n                      \u4E0A\u50B3\u9023\u7D50\n                    </button>\n                  </div>\n                  \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\"\n            data-bs-dismiss=\"modal\">\u53D6\u6D88</button>\n            <button type=\"button\" class=\"btn btn-primary\"\n            @click=\"$emit('update-product', modalData)\">\u5132\u5B58</button>\n          </div>\n        </div>\n      </div>\n    </div>",
  props: ['modalData', 'modalTitle'],
  data: function data() {
    return {
      tempUrl: ''
    };
  },
  methods: {
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
    }
  }
}).component('deleteModal', {
  template: "\n    <div class=\"modal fade\" id=\"deleteModal\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content border-0\">\n          <div class=\"modal-header\">\n            <div class=\"modal-title\">{{ modalTitle }}</div>\n            <span class=\"material-icons close\"\n            data-bs-dismiss=\"modal\"\n            role=\"button\">clear</span>\n          </div>\n          <div class=\"modal-body\">\n            <p>\n                \u662F\u5426\u522A\u9664\n                <span class=\"text-danger font-weight-bold\">\n                  {{ deleteData.title }}\n                </span>\n                {{ modalText }}\uFF1F\n                <span class=\"text-secondary\">(\u522A\u9664\u5F8C\u5C07\u7121\u6CD5\u6062\u5FA9)</span>\n              </p>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\"\n            data-bs-dismiss=\"modal\">\u53D6\u6D88</button>\n            <button type=\"button\" class=\"btn btn-danger\"\n            @click=\"$emit('delete-product', deleteData.id)\">\u78BA\u5B9A\u522A\u9664</button>\n          </div>\n        </div>\n      </div>\n    </div>",
  props: ['deleteData', 'modalTitle', 'modalText'],
  data: function data() {
    return {};
  }
}).mount('#app');