import pagination from './pagination.js'
const url = 'https://vue3-course-api.hexschool.io'
const path = 'bistro'
let productModal = {}
let deleteModal = {}

const app = {
  components: {
    pagination
  },
  data () {
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
        if (!res.data.success) { alert(res.data.message) }
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
          console.log(this.pages)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct (modalData) {
      const vm = this
      let api = ''
      let method = ''
      if (vm.isNew === true) {
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
        this.closeModal(productModal)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteProduct (id) {
      const api = `${url}/api/${path}/admin/product/${id}`
      axios.delete(api).then(res => {
        if (!res.data.success) { alert(res.data.message) }
        console.log(`已刪除${this.deleteData.title}商品`)
        this.getProducts()
        this.closeModal(deleteModal)
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
      if (isNew === true) {
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
      productModal.show()
      this.updateTabs()
    },
    alertModal (item) {
      this.deleteData = { ...item }
      this.modalTitle = '刪除商品'
      this.modalText = '商品'
      deleteModal.show()
    },
    closeModal (modal) {
      modal.hide()
    }
  },
  mounted () {
    if (this.check === true) {
      this.checkLogin()
      productModal = new bootstrap.Modal(document.getElementById('productModal'))
      deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    }
    return this.modalData
  }
}

Vue.createApp(app)
  .component('productModal', {
    template: `
    <div class="modal fade" id="productModal">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header">
            <div class="modal-title">{{ modalTitle }}</div>
            <span class="material-icons close"
            data-bs-dismiss="modal"
            role="button">clear</span>
          </div>
          <div class="modal-body">
            <ul class="nav nav-pills" role="tablist">
              <li class="nav-item">
                <button class="nav-link active" 
                data-bs-toggle="tab" 
                data-bs-target="#basic" 
                type="button" role="tab">商品資訊</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" 
                data-bs-toggle="tab" 
                data-bs-target="#info" 
                type="button" role="tab">商品內容</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" 
                data-bs-toggle="tab" 
                data-bs-target="#photo" 
                type="button" role="tab">商品圖片</button>
              </li>
            </ul>
            <div class="tab-content mt-2">
              <div class="tab-pane fade show active" id="basic" role="tabpanel">
                <div class="form-row d-flex">
                    <div class="form-group w-100">
                      <label class="py-2" for="name">名稱</label>
                      <input
                        type="text"
                        class="form-control w-90"
                        placeholder="輸入商品名稱"
                        id="name"
                        v-model="modalData.title"
                      />
                    </div>
                    <div class="form-group w-100">
                      <label class="py-2" for="category">類別</label>
                      <select
                        id="category"
                        class="form-select text-secondary form-control w-90"
                        v-model="modalData.category"
                      >
                        <option value="選擇類別" selected disabled>選擇類別</option>
                        <option value="調酒">調酒</option>
                        <option value="果汁">果汁</option>
                        <option value="茶飲">茶飲</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row d-flex">
                    <div class="form-group w-100">
                      <label class="py-2" for="origin_price">原價</label>
                      <input
                        type="text"
                        class="form-control w-90"
                        placeholder="輸入原價"
                        id="origin_price"
                        v-model.number="modalData.origin_price"
                      />
                    </div>
                    <div class="form-group w-100">
                      <label class="py-2" for="price">售價</label>
                      <input
                        type="text"
                        class="form-control w-90"
                        placeholder="輸入售價"
                        id="price"
                        v-model.number="modalData.price"
                      />
                    </div>
                    <div class="form-group w-100">
                      <label class="py-2" for="unit">單位</label>
                      <select
                        id="unit"
                        class="form-select text-secondary form-control w-90"
                        v-model="modalData.unit"
                      >
                        <option value="選擇單位" selected disabled>選擇單位</option>
                        <option value="杯">杯</option>
                        <option value="壺">壺</option>
                        <option value="罐">罐</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div class="form-row d-flex">
                    <label class="" for="switch">是否啟用</label>
                    <div class="switch-group">
                      <input type="checkbox" id="switch"
                      v-model="modalData.is_enable"
                      :checked="modalData.is_enable">
                      <div class="ico_switch"></div>
                    </div>
                  </div>
              </div>
              <div class="tab-pane fade" id="info" role="tabpanel">
                <div class="form-group w-100">
                  <label class="py-2" for="description">商品描述</label>
                  <textarea
                    row="3"
                    class="form-control"
                    placeholder="輸入商品描述"
                    id="description"
                    v-model="modalData.description"
                  ></textarea>
                </div>
                <div class="form-group w-100">
                  <label class="py-2" for="info">說明內容</label>
                  <textarea
                    row="3"
                    class="form-control"
                    placeholder="輸入商品內容"
                    id="info"
                    v-model="modalData.content"
                    ></textarea>
                </div>
              </div>
              <div class="tab-pane fade" id="photo" role="tabpanel">
                <div class="form-group d-flex justify-content-start">
                  <div class="imgs-empty"
                  v-if="!modalData.imagesUrl.length"
                  v-for="(img, i) in 3" :key="i">
                  <span class="material-icons">photo</span>
                </div>

                  <div class="imgs-fill"
                  v-else 
                  v-for="(img, key) in modalData.imagesUrl"
                  :key="key"> 
                    <span class="material-icons" role="button"
                    @click="removeImage(img, key)">
                      remove
                    </span>
                    <img class="img-thumbnail" :src="img" alt="">
                  </div> 
                </div>
                <div class="form-group">
                  <label class="py-2" for="imagesUrl">圖片連結</label>
                  <div class="input-group">
                    <input type="text" class="form-control"
                    placeholder="輸入圖片連結"
                    v-model="tempUrl"
                    :disabled="modalData.imagesUrl.length >= 3">
                    <button class="btn btn-outline-secondary"
                    :disabled="modalData.imagesUrl.length >= 3"
                    @click="uploadImage">
                      上傳連結
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
            @click="$emit('update-product', modalData)">儲存</button>
          </div>
        </div>
      </div>
    </div>`,
    props: ['modalData', 'modalTitle'],
    data () {
      return {
        tempUrl: ''
      }
    },
    methods: {
      uploadImage () {
        if (this.tempUrl.trim() !== '') {
          this.modalData.imagesUrl.push(this.tempUrl)
          this.tempUrl = ''
        } else {
          alert('請輸入連結網址')
        }
      },
      removeImage (item, key) {
        const result = this.modalData.imagesUrl.filter((img, idx) => key !== idx)
        this.modalData.imagesUrl = result
      },
    }
  })
  .component('deleteModal', {
    template: `
    <div class="modal fade" id="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header">
            <div class="modal-title">{{ modalTitle }}</div>
            <span class="material-icons close"
            data-bs-dismiss="modal"
            role="button">clear</span>
          </div>
          <div class="modal-body">
            <p>
                是否刪除
                <span class="text-danger font-weight-bold">
                  {{ deleteData.title }}
                </span>
                {{ modalText }}？
                <span class="text-secondary">(刪除後將無法恢復)</span>
              </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click="$emit('delete-product', deleteData.id)">確定刪除</button>
          </div>
        </div>
      </div>
    </div>`,
    props: ['deleteData', 'modalTitle', 'modalText'],
    data () {
      return {}
    }
  }).mount('#app')
