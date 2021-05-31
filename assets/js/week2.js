"use strict";

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var getElemtAllAll = function getElemtAllAll(elemt) {
  return document.querySelector(elemt);
}; 


var url = 'https://vue3-course-api.hexschool.io';
var path = 'bistro'; 

var _loading = getElemt('#loading'); 


var username = getElemt('#username');
var password = getElemt('#password');
var signin = getElemt('#signin');
var signInBtn = getElemt('#signinBtn');
var logoutBtn = getElemt('#logoutBtn'); 

var checkStatus = getElemt('#checkStatus');
var productForm = getElemt('#productForm');
var productList = getElemt('#productList');
var addProductBtn = getElemt('#addProductBtn'); 

var title = getElemt('#title');
var isEnable = getElemt('#is_enable');
var originPrice = getElemt('#origin_price');
var price = getElemt('#price');
var app = {
  data: {
    products: [],
    newProduct: {},
    form: {}
  },
  loading: function loading() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (status) {
      _loading.classList.remove('d-none');

      _loading.classList.add('show');
    } else {
      _loading.classList.remove('show');

      _loading.classList.add('d-none');
    }
  },
  signin: function signin() {
    var _this = this;

    var api = "".concat(url, "/admin/signin");
    var vm = this;
    vm.data.form = {
      username: username.value,
      password: password.value
    };
    this.loading(true);
    axios.post(api, vm.data.form).then(function (res) {
      if (res.data.success) {
        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired;
        document.cookie = "bistroToken=".concat(token, "; expired=").concat(new Date(expired));
        location.assign('./product.html');
      } else {
        alert(res.data.message);

        _this.loading(false);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  logout: function logout() {
    var _this2 = this;

    this.loading(true);
    axios.post("".concat(url, "/logout")).then(function (res) {
      if (res.data.success) {
        document.cookie = "bistroToken= ;expired=".concat(new Date(), " ");
        location.assign('./');
      } else {
        alert(res.data.message);

        _this2.loading(false);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  checkLogin: function checkLogin() {
    var _this3 = this;

    var token = document.cookie.replace(/(?:(?:^|.*;\s*)bistroToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.loading(true); 

    axios.post("".concat(url, "/api/user/check")).then(function (res) {
      if (res.data.success) {
        _this3.getProducts();

        checkStatus.innerHTML = '已登入';
      } else {
        checkStatus.innerHTML = res.data.message;
        alert(res.data.message);

        _this3.loading(false);

        location.assign('./');
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  getProducts: function getProducts() {
    var api = "".concat(url, "/api/").concat(path, "/admin/products");
    var vm = this;
    axios.get(api).then(function (res) {
      if (res.data.success) {
        vm.data.products = res.data.products;
        vm.renderProducts(res.data.products); 
      } else {
        alert(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  updateProduct: function updateProduct(id) {
    var _this4 = this;

    var api = "".concat(url, "/api/").concat(path, "/admin/product/").concat(id);
    var vm = this;
    this.loading(true);
    axios.put(api, {
      data: vm.data.newProduct[0]
    }).then(function (res) {
      if (res.data.success) {
        vm.getProducts();
      } else {
        alert(res.data.message);

        _this4.loading(false);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  addProduct: function addProduct() {
    var _this5 = this;

    var api = "".concat(url, "/api/").concat(path, "/admin/product");
    var vm = this;
    vm.data.newProduct = {
      title: title.value,
      category: '調酒',
      is_enable: isEnable.checked,
      origin_price: parseInt(originPrice.value),
      price: parseInt(price.value),
      unit: '杯'
    };
    this.loading(true);
    axios.post(api, {
      data: vm.data.newProduct
    }).then(function (res) {
      if (res.data.success) {
        vm.getProducts();
        vm.resetForm();
      } else {
        alert(res.data.message);

        _this5.loading(false);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  resetForm: function resetForm() {
    title.value = '';
    isEnable.checked = false;
    originPrice.value = '';
    price.value = '';
    this.data.newProduct = {};
  },
  removeProduct: function removeProduct(id) {
    var _this6 = this;

    var api = "".concat(url, "/api/").concat(path, "/admin/product/").concat(id);
    var vm = this;
    this.loading(true);
    axios["delete"](api).then(function (res) {
      if (res.data.success) {
        vm.getProducts();
      } else {
        alert(res.data.message);

        _this6.loading(false);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  switchProduct: function switchProduct(id) {
    var filterData = this.data.products.filter(function (item) {
      return item.id === id;
    });
    filterData[0].is_enable = !filterData[0].is_enable;
    this.data.newProduct = filterData;
    this.updateProduct(id);
  },
  renderProducts: function renderProducts(data) {
    var money = function money(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    var cont = '';
    productList.innerHTML = '';
    data.forEach(function (item) {
      cont += "\n\t\t\t<li class=\"list-group-item bg-transparent d-flex align-items-center\">\n        <div class=\"col-5\">".concat(item.title, "</div>\n        <div class=\"col-2\">").concat(money(item.origin_price), "</div>\n        <div class=\"col-2\">").concat(money(item.price), "</div>\n        <div class=\"col-2 text-center\">\n          <div class=\"switch-group mx-auto\">\n            <input data-switch=\"").concat(item.id, "\" type=\"checkbox\"\n            ").concat(item.is_enable ? 'checked' : '', ">\n            <span class=\"ico_switch\"></span>\n          </div>\n        </div>\n        <div class=\"col-1 text-center material-icons text-warning\" role=\"button\" data-remove=\"").concat(item.id, "\">\n          delete\n        </div>\n      </li>");
    });
    productList.innerHTML = cont;
    this.loading(false);
  },
  init: function init() {
    var _this7 = this;

    var pathname = location.pathname;

    if (!pathname.includes('product')) {
      signInBtn.addEventListener('click', function () {
        return _this7.signin();
      });
    } else {
      this.checkLogin();
      logoutBtn.addEventListener('click', function () {
        return _this7.logout();
      });
      addProductBtn.addEventListener('click', function () {
        return _this7.addProduct();
      });
      window.addEventListener('click', function (e) {
        var target = e.target;
        var active = target.dataset["switch"];
        var remove = target.dataset.remove;

        if (!active && !remove) {
          return;
        }

        active ? _this7.switchProduct(active) : '';
        remove ? _this7.removeProduct(remove) : '';
      });
    }
  },
  created: function created() {
    this.init();
  }
};
app.created();