export default {
  template: "\n    <div class=\"modal fade\" id=\"detailModal\" ref=\"detailModal\">\n      <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content border-0\">\n          <div class=\"modal-header\">\n            <div class=\"modal-title\">{{ detailData.title }}</div>\n            <span class=\"material-icons close\"\n            data-bs-dismiss=\"modal\"\n            role=\"button\">clear</span>\n          </div>\n          <div class=\"modal-body row g-0\">\n            <div class=\"col-7 overflow-hidden position-relative\" style=\"height: 400px;\">\n              <img class=\"img-fluid position-absolute top-50 start-50 translate-middle\" :src=\"detailData.imageUrl\" />\n            </div>\n            <div class=\"col-5 ps-3\">\n              <p class=\"badge bg-secondary rounded-pill py-1 px-3\">{{ detailData.category }}</p>\n              <p>\u5546\u54C1\u5167\u5BB9\uFF1A</p>\n              <p>{{ detailData.content }}</p>\n              <div class=\"row g-0\">\n                <div class=\"col-6\">\n                  <span>\u539F\u50F9\uFF1A</span>\n                  <span class=\"fs-3 fw-bold\"><del>{{ detailData.origin_price }}</del></span>\n                </div>\n                <div class=\"col-6\">\n                  <span>\u552E\u50F9\uFF1A</span>\n                  <span class=\"fs-3 fw-bold text-danger\">{{ detailData.price }}</span>\n                </div>\n              </div>\n              <input type=\"number\" min=\"0\" max=\"10\" class=\"form-control\"\n                v-model.number=\"qty\" />\n              <button type=\"button\" class=\"btn btn-lg w-100 mt-3 btn-primary d-flex align-items-center justify-content-center\"\n                @click=\"$emit('add-to-cart', detailData, qty)\"\n                :disabled=\"spinItem == detailData.id\">\n                <i class=\"spinner\" \n                :class=\"spinItem == detailData.id ? 'show' : 'fade d-none'\"></i>\n                \u52A0\u5165\u8CFC\u7269\u8ECA</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  props: ['detailData', 'spinItem'],
  data: function data() {
    return {
      qty: 1
    };
  },
  watch: {
    detailData: function detailData() {
      this.qty = 1;
    }
  }
};