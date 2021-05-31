// funcs
const getElemt = (elemt) => document.querySelector(elemt)
const getElemtAllAll = (elemt) => document.querySelector(elemt)
// api
const url = 'https://vue3-course-api.hexschool.io'
const path = 'bistro'
//loading
const loading = getElemt('#loading')
// signin
const username = getElemt('#username')
const password = getElemt('#password')
const signin = getElemt('#signin')
const signInBtn = getElemt('#signinBtn')
const logoutBtn = getElemt('#logoutBtn')
// products
const checkStatus = getElemt('#checkStatus')
const productForm = getElemt('#productForm')
const productList = getElemt('#productList')
const addProductBtn = getElemt('#addProductBtn')
// data form
const title = getElemt('#title')
const isEnable = getElemt('#is_enable')
const originPrice = getElemt('#origin_price')
const price = getElemt('#price')

const app = {
  data: {
    products: [],
    newProduct: {},
    form: {},
  },
  loading(status = false) {
    if (status) {
      loading.classList.remove('d-none')
      loading.classList.add('show')
    } else {
      loading.classList.remove('show')
      loading.classList.add('d-none')
    }
  },
  signin() {
    const api = `${url}/admin/signin`
    const vm = this
    vm.data.form = {
      username: username.value,
      password: password.value
    }
    this.loading(true)
    axios.post(api, vm.data.form)
      .then(res => {
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `bistroToken=${token}; expired=${ new Date(expired) }`
          location.assign('./product.html')
        } else {
          alert(res.data.message)
          this.loading(false)
        }
      }).catch(err => {
        console.log(err)
      })
  },
  logout() {
    this.loading(true)
    axios.post(`${url}/logout`)
      .then(res => {
        if (res.data.success) {
          document.cookie = `bistroToken= ;expired=${ new Date() } `
          location.assign('./')
        } else {
          alert(res.data.message)
          this.loading(false)
        }
      }).catch(err => {
        console.log(err)
      })
  },
  checkLogin() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)bistroToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    axios.defaults.headers.common['Authorization'] = token
    this.loading(true)
    // 驗證是否成功取得 token
    axios.post(`${url}/api/user/check`)
      .then(res => {
        if (res.data.success) {
          this.getProducts()
          checkStatus.innerHTML = '已登入'
        } else {
          checkStatus.innerHTML = res.data.message
          alert(res.data.message)
          this.loading(false) 
          location.assign('./')
        }
      }).catch(err => {
        console.log(err)
      })
  },
  getProducts() {
    const api = `${url}/api/${path}/admin/products`
    const vm = this
    axios.get(api)
      .then(res => {
        if (res.data.success) {
          vm.data.products = res.data.products
          vm.renderProducts(res.data.products)
          // console.log(res.data)
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
  },
  updateProduct(id) {
    const api = `${url}/api/${path}/admin/product/${id}`
    const vm = this
    this.loading(true)
    axios.put(api, {data: vm.data.newProduct[0]})
    .then(res => {
      if (res.data.success) {
        vm.getProducts()
      } else {
        alert(res.data.message)
        this.loading(false)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  addProduct() {
    const api = `${url}/api/${path}/admin/product`
    const vm = this
    vm.data.newProduct = {
      title: title.value,
      category: '調酒',
      is_enable: isEnable.checked,
      origin_price: parseInt(originPrice.value),
      price: parseInt(price.value),
      unit: '杯'
    }
    this.loading(true)
    axios.post(api, {data: vm.data.newProduct})
    .then(res => {
      if (res.data.success) {
        vm.getProducts()
        vm.resetForm()
      } else {
        alert(res.data.message)
        this.loading(false)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  resetForm() {
    title.value = ''
    isEnable.checked = false
    originPrice.value = ''
    price.value = ''
    this.data.newProduct = {}
  },
  removeProduct(id) {
   const api = `${url}/api/${path}/admin/product/${id}`
   const vm = this
   this.loading(true)
   axios.delete(api)
   .then(res => {
     if (res.data.success) {
      vm.getProducts()
     } else {
      alert(res.data.message)
      this.loading(false)
     }
   }).catch(err => {
     console.log(err)
   })
  },
  switchProduct(id) {
    const filterData = this.data.products.filter(item => item.id === id)
    filterData[0].is_enable = !filterData[0].is_enable
    this.data.newProduct = filterData
    this.updateProduct(id)
  },
  renderProducts(data) {
    const money = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    let cont = ''
    productList.innerHTML = ''
    data.forEach(item => {
      cont += `
			<li class="list-group-item bg-transparent d-flex align-items-center">
        <div class="col-5">${item.title}</div>
        <div class="col-2">${money(item.origin_price)}</div>
        <div class="col-2">${money(item.price)}</div>
        <div class="col-2 text-center">
          <div class="switch-group mx-auto">
            <input data-switch="${item.id}" type="checkbox"
            ${item.is_enable ? 'checked' : ''}>
            <span class="ico_switch"></span>
          </div>
        </div>
        <div class="col-1 text-center material-icons text-warning" role="button" data-remove="${item.id}">
          delete
        </div>
      </li>`
    })
    productList.innerHTML = cont
    this.loading(false)
  },
  init() {
    const pathname = location.pathname
    if (!pathname.includes('product')) {
      signInBtn.addEventListener('click', () => this.signin())
    } else {
      this.checkLogin()
      logoutBtn.addEventListener('click', () => this.logout())
      addProductBtn.addEventListener('click', () => this.addProduct())
      window.addEventListener('click', (e) => {
        const target = e.target
        const active = target.dataset.switch
        const remove = target.dataset.remove
        if (!active && !remove) { return }
        active ? this.switchProduct(active) : ''
        remove ? this.removeProduct(remove) : ''
      })
    }
  },
  created() {
    this.init()
  }
}

app.created()