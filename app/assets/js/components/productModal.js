export default {
  template: `
    <div class="modal fade" id="productModal"
      data-bs-backdrop="static" 
      data-bs-keyboard="false">
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
                        type="number"
                        min="0"
                        class="form-control w-90"
                        placeholder="輸入原價"
                        id="origin_price"
                        v-model.number="modalData.origin_price"
                      />
                    </div>
                    <div class="form-group w-100">
                      <label class="py-2" for="price">售價</label>
                      <input
                        type="number"
                        min="0"
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
                  <label class="py-2" for="productInfo">說明內容</label>
                  <textarea
                    row="3"
                    class="form-control"
                    placeholder="輸入商品內容"
                    id="productInfo"
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
                    <span class="remove material-icons" role="button"
                    @click="removeImage(img, key)">
                      remove
                    </span>
                    <img class="img-thumbnail" :src="img" alt="">
                    <div class="form-check form-check-inline img-mark">
                      <input class="form-check-input me-1 mb-1" type="radio" name="main" :value="img" :id="'radio' + (key+1)"
                      @click="selectMainImage(img)"
                      :checked="img == modalData.imageUrl">
                      <label class="form-check-label"
                      role="button"
                      :for="'radio' + (key+1)">設定主圖</label>
                    </div>
                  </div> 
                </div>
                <div class="form-group">
                  <label class="py-2" for="imagesUrl">圖片連結</label>
                  <div class="input-group">
                    <input type="text" class="form-control"
                    id="imagesUrl"
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
        const isRepeat = this.modalData.imagesUrl.find(item => item === this.tempUrl)
        if (isRepeat) {
          alert('連結網址不可重複')
        } else {
          this.modalData.imagesUrl.push(this.tempUrl)
          this.tempUrl = ''
        }
        if (!this.modalData.imageUrl) {
          this.modalData.imageUrl = this.modalData.imagesUrl[0]
        }
      } else {
        alert('請輸入連結網址')
      }
    },
    removeImage (item, key) {
      const result = this.modalData.imagesUrl.filter((img, idx) => key !== idx)
      this.modalData.imagesUrl = result
    },
    selectMainImage (img) {
      this.modalData.imageUrl = img
    }
  }
}
