function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = 'https://vue3-course-api.hexschool.io';
var path = 'bistro';
export default {
  getUserProducts: function getUserProducts() {
    var _this = this;

    var api = "".concat(url, "/api/").concat(path, "/products");
    axios.get(api).then(function (res) {
      if (res.data.success) {
        _this.products = res.data.products;
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  getCarts: function getCarts() {
    var _this2 = this;

    var api = "".concat(url, "/api/").concat(path, "/cart");
    axios.get(api).then(function (res) {
      if (res.data.success) {
        _this2.cart = res.data.data;
        _this2.final_total = res.data.data.final_total;
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  addToCart: function addToCart(item, qty) {
    var _this3 = this;

    var api = "".concat(url, "/api/").concat(path, "/cart");
    var cart = {
      product_id: item.id,
      qty: qty
    };
    this.spinItem = item.id;
    axios.post(api, {
      data: cart
    }).then(function (res) {
      if (res.data.success) {
        _this3.detailData = {};
        _this3.detailData.qty = 1;

        _this3.getCarts();

        _this3.closeModal(_this3.detailModal);

        _this3.spinItem = '';
      } else {
        alert(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  updateUserCarts: function updateUserCarts(id, qty) {
    var _this4 = this;

    var api = "".concat(url, "/api/").concat(path, "/cart/").concat(id);
    var cart = {
      product_id: id,
      qty: qty
    };
    axios.put(api, {
      data: cart
    }).then(function (res) {
      if (res.data.success) {
        if (qty === 0) {
          _this4.deleteCartProduct(id);
        } else {
          _this4.getCarts();
        }
      } else {
        alert(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  deleteCartProduct: function deleteCartProduct(id) {
    var _this5 = this;

    var api = "".concat(url, "/api/").concat(path, "/cart/").concat(id);
    axios["delete"](api).then(function (res) {
      if (res.data.success) {
        _this5.getCarts();
      } else {
        console.log(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  clearCart: function clearCart() {
    var _this6 = this;

    var api = "".concat(url, "/api/").concat(path, "/carts");
    this.spinItem = true;
    axios["delete"](api).then(function (res) {
      if (res.data.success) {
        alert('已清除購物車');

        _this6.getCarts();

        _this6.$refs.form.resetForm();

        _this6.isCheckout = false;
        _this6.spinItem = false;
      } else {
        alert();
      }

      _this6.$refs.form.resetForm();
    })["catch"](function (err) {
      console.log(err);
    });
  },
  openProduct: function openProduct(id) {
    var _this7 = this;

    var api = "".concat(url, "/api/").concat(path, "/product/").concat(id);
    axios.get(api).then(function (res) {
      if (res.data.success) {
        _this7.detailData = res.data.product;
        _this7.detailData.qty = 1;
        _this7.detailData.origin_price = _this7.money(_this7.detailData.origin_price);
        _this7.detailData.price = _this7.money(_this7.detailData.price);

        _this7.detailModal.show();
      } else {
        alert(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  },
  checkout: function checkout() {
    var _this8 = this;

    var api = "".concat(url, "/api/").concat(path, "/order");
    var form = {
      user: _objectSpread({}, this.order),
      message: this.userMessage
    };
    this.spinItem = 'checkout';
    axios.post(api, {
      data: form
    }).then(function (res) {
      if (res.data.success) {
        _this8.getCarts(); 


        _this8.$refs.form.resetForm();

        _this8.isCheckout = false;
      } else {
        console.log(res);
      }

      alert(res.data.message);
      _this8.spinItem = '';
    })["catch"](function (err) {
      console.log(err);
    });
  }
};