export default {
  template: `
    <div class="modal fade" id="detailModal" ref="detailModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header">
            <div class="modal-title">{{ detailData.title }}</div>
            <span class="material-icons close"
            data-bs-dismiss="modal"
            role="button">clear</span>
          </div>
          <div class="modal-body row g-0">
            <div class="col-7 overflow-hidden position-relative" style="height: 400px;">
              <img class="img-fluid position-absolute top-50 start-50 translate-middle" :src="detailData.imageUrl" />
            </div>
            <div class="col-5 ps-3">
              <p class="badge bg-secondary rounded-pill py-1 px-3">{{ detailData.category }}</p>
              <p>商品內容：</p>
              <p>{{ detailData.content }}</p>
              <div class="row g-0">
                <div class="col-6">
                  <span>原價：</span>
                  <span class="fs-3 fw-bold"><del>{{ detailData.origin_price }}</del></span>
                </div>
                <div class="col-6">
                  <span>售價：</span>
                  <span class="fs-3 fw-bold text-danger">{{ detailData.price }}</span>
                </div>
              </div>
              <input type="number" min="0" max="10" class="form-control"
                v-model.number="qty" />
              <button type="button" class="btn btn-lg w-100 mt-3 btn-primary"
                @click="$emit('add-to-cart', detailData, qty)">
              加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  props: ['detailData', 'propQty'],
  data () {
    return {
      qty: 0
    }
  },
  watch: {
    propQty () {
      this.qty = this.propQty
      console.log('watch：', this.propQty)
    }
  }
  // mounted () {
  //   this.qty = this.propQty
  //   console.log('mounted', this.propQty)
  // }
}
