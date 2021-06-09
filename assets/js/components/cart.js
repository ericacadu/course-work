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
    axios.post(api, {
      data: cart
    }).then(function (res) {
      if (res.data.success) {
        _this3.detailData = {};
        _this3.detailData.qty = 0;

        _this3.getCarts();

        _this3.closeModal(_this3.detailModal);
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
      _this5.getCarts();
    })["catch"](function (err) {
      console.log(err);
    });
  },
  deleteCart: function deleteCart() {
    var _this6 = this;

    var api = "".concat(url, "/api/").concat(path, "/carts");
    axios["delete"](api).then(function (res) {
      if (res.data.success) {
        alert('已清除購物車');

        _this6.getCarts();
      } else {
        alert();
      }
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
        _this7.detailData.qty = 0;

        _this7.detailModal.show();

        console.log('opened：', _this7.detailData.qty);
      } else {
        alert(res.data.message);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  }
};