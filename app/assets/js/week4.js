/* eslint-disable no-undef */
import pagination from './components/pagination.js'
import modalProduct from './components/productModal.js'
import modalDelete from './components/deleteModal.js'
const url = 'https://vue3-course-api.hexschool.io'
const path = 'bistro'

const app = {
  components: {
    pagination,
    modalProduct,
    modalDelete
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
      deleteModal: {}
    }
  },
  methods: {
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
        const { token, expired } = res.data
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
    },
    getProducts (page = 1) {
      const api = `${url}/api/${path}/admin/products?page=${page}`
      axios.get(api).then(res => {
        if (res.data.success) {
          this.products = res.data.products
          this.pages = res.data.pagination
          this.closeModal(this.productModal)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct (modalData) {
      const vm = this
      let api = ''
      let method = ''
      if (vm.isNew) {
        method = 'post'
        api = `${url}/api/${path}/admin/product`
      } else {
        method = 'put'
        api = `${url}/api/${path}/admin/product/${modalData.id}`
      }
      axios[method](api, { data: vm.modalData }).then(res => {
        if (res.data.success) {
          this.getProducts()
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteProduct (id) {
      const api = `${url}/api/${path}/admin/product/${id}`
      axios.delete(api).then(res => {
        if (!res.data.success) { alert(res.data.message) }
        alert(`已刪除${this.deleteData.title}商品`)
        this.getProducts()
        this.closeModal(this.deleteModal)
      }).catch(err => {
        console.log(err)
      })
    },
    updateTabs () {
      const pills = document.querySelectorAll('.nav-pills .nav-link')
      const panes = document.querySelectorAll('.tab-pane')
      const changeTab = (elemt) => {
        elemt.forEach(item => item.classList.remove('active'))
        elemt[0].classList.add('active')
        elemt[0].classList.add('show')
      }
      changeTab(pills)
      changeTab(panes)
    },
    openModal (isNew, item) {
      this.modalData = {
        category: '選擇類別',
        unit: '選擇單位',
        imagesUrl: []
      }
      this.tempUrl = ''
      if (isNew) {
        this.isNew = true
        this.modalTitle = '新增商品'
      } else {
        this.isNew = false
        this.modalTitle = '編輯商品'
        this.modalData = JSON.parse(JSON.stringify(item))
        if (this.modalData.imagesUrl === undefined) {
          this.modalData.imagesUrl = []
        }
      }
      this.productModal.show()
      this.updateTabs()
    },
    alertModal (item) {
      this.deleteData = { ...item }
      this.modalTitle = '刪除商品'
      this.modalText = '商品'
      this.deleteModal.show()
    },
    closeModal (modal) {
      modal.hide()
    }
  },
  mounted () {
    if (this.check) {
      this.checkLogin()
      this.productModal = new bootstrap.Modal(document.getElementById('productModal'))
      this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    }
    return this.modalData
  }
}
Vue.createApp(app).mount('#app')
