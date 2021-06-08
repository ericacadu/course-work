const url = 'https://vue3-course-api.hexschool.io'
// const path = 'bistro'

export default {
  signin () {
    const api = `${url}/admin/signin`
    if (this.user.username === 'admin' &&
      this.user.password === 'admin') {
      // 帳密僅供作業及加速測試用，正式上線版本會移除
      this.form = {
        username: 'bistro@gmail.com',
        password: 'bistro'
      }
    } else {
      this.form = this.user
    }
    axios.post(api, this.form).then(res => {
      if (!res.data.success) {
        alert(res.data.message)
        return
      }
      const {
        token,
        expired
      } = res.data
      document.cookie = `bistroToken=${token}; expires=${new Date(expired)}`
      location.assign('product.html')
    }).catch(err => {
      console.log(err)
    })
  },
  logout () {
    axios.post(`${url}/logout`).then(res => {
      if (res.data.success) {
        document.cookie = `bistroToken= ; expires=${new Date()}`
        location.assign('./')
      } else {
        alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  checkLogin () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)bistroToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    axios.post(`${url}/api/user/check`).then(res => {
      if (res.data.success) {
        this.status = true
        this.getProducts()
      } else {
        this.status = false
        alert(res.data.message)
        location.assign('./')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
