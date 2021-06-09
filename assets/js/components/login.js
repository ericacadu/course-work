var url = 'https://vue3-course-api.hexschool.io'; 

export default {
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
        return;
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
  }
};