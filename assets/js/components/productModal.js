export default {
  template: "\n    <div class=\"modal fade\" id=\"productModal\"\n      data-bs-backdrop=\"static\" \n      data-bs-keyboard=\"false\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content border-0\">\n          <div class=\"modal-header\">\n            <div class=\"modal-title\">{{ modalTitle }}</div>\n            <span class=\"material-icons close\"\n            data-bs-dismiss=\"modal\"\n            role=\"button\">clear</span>\n          </div>\n          <div class=\"modal-body\">\n            <ul class=\"nav nav-pills\" role=\"tablist\">\n              <li class=\"nav-item\">\n                <button class=\"nav-link active\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#basic\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u8CC7\u8A0A</button>\n              </li>\n              <li class=\"nav-item\">\n                <button class=\"nav-link\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#info\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u5167\u5BB9</button>\n              </li>\n              <li class=\"nav-item\">\n                <button class=\"nav-link\" \n                data-bs-toggle=\"tab\" \n                data-bs-target=\"#photo\" \n                type=\"button\" role=\"tab\">\u5546\u54C1\u5716\u7247</button>\n              </li>\n            </ul>\n            <div class=\"tab-content mt-2\">\n              <div class=\"tab-pane fade show active\" id=\"basic\" role=\"tabpanel\">\n                <div class=\"form-row d-flex\">\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"name\">\u540D\u7A31</label>\n                      <input\n                        type=\"text\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u5546\u54C1\u540D\u7A31\"\n                        id=\"name\"\n                        v-model=\"modalData.title\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"category\">\u985E\u5225</label>\n                      <select\n                        id=\"category\"\n                        class=\"form-select text-secondary form-control w-90\"\n                        v-model=\"modalData.category\"\n                      >\n                        <option value=\"\u9078\u64C7\u985E\u5225\" selected disabled>\u9078\u64C7\u985E\u5225</option>\n                        <option value=\"\u8ABF\u9152\">\u8ABF\u9152</option>\n                        <option value=\"\u679C\u6C41\">\u679C\u6C41</option>\n                        <option value=\"\u8336\u98F2\">\u8336\u98F2</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-row d-flex\">\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"origin_price\">\u539F\u50F9</label>\n                      <input\n                        type=\"number\"\n                        min=\"0\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u539F\u50F9\"\n                        id=\"origin_price\"\n                        v-model.number=\"modalData.origin_price\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"price\">\u552E\u50F9</label>\n                      <input\n                        type=\"number\"\n                        min=\"0\"\n                        class=\"form-control w-90\"\n                        placeholder=\"\u8F38\u5165\u552E\u50F9\"\n                        id=\"price\"\n                        v-model.number=\"modalData.price\"\n                      />\n                    </div>\n                    <div class=\"form-group w-100\">\n                      <label class=\"py-2\" for=\"unit\">\u55AE\u4F4D</label>\n                      <select\n                        id=\"unit\"\n                        class=\"form-select text-secondary form-control w-90\"\n                        v-model=\"modalData.unit\"\n                      >\n                        <option value=\"\u9078\u64C7\u55AE\u4F4D\" selected disabled>\u9078\u64C7\u55AE\u4F4D</option>\n                        <option value=\"\u676F\">\u676F</option>\n                        <option value=\"\u58FA\">\u58FA</option>\n                        <option value=\"\u7F50\">\u7F50</option>\n                      </select>\n                    </div>\n                  </div>\n                  <hr />\n                  <div class=\"form-row d-flex\">\n                    <label class=\"\" for=\"switch\">\u662F\u5426\u555F\u7528</label>\n                    <div class=\"switch-group\">\n                      <input type=\"checkbox\" id=\"switch\"\n                      v-model=\"modalData.is_enabled\"\n                      :checked=\"modalData.is_enabled\">\n                      <div class=\"ico_switch\"></div>\n                    </div>\n                  </div>\n              </div>\n              <div class=\"tab-pane fade\" id=\"info\" role=\"tabpanel\">\n                <div class=\"form-group w-100\">\n                  <label class=\"py-2\" for=\"description\">\u5546\u54C1\u63CF\u8FF0</label>\n                  <textarea\n                    row=\"3\"\n                    class=\"form-control\"\n                    placeholder=\"\u8F38\u5165\u5546\u54C1\u63CF\u8FF0\"\n                    id=\"description\"\n                    v-model=\"modalData.description\"\n                  ></textarea>\n                </div>\n                <div class=\"form-group w-100\">\n                  <label class=\"py-2\" for=\"productInfo\">\u8AAA\u660E\u5167\u5BB9</label>\n                  <textarea\n                    row=\"3\"\n                    class=\"form-control\"\n                    placeholder=\"\u8F38\u5165\u5546\u54C1\u5167\u5BB9\"\n                    id=\"productInfo\"\n                    v-model=\"modalData.content\"\n                    ></textarea>\n                </div>\n              </div>\n              <div class=\"tab-pane fade\" id=\"photo\" role=\"tabpanel\">\n                <div class=\"form-group d-flex justify-content-start\">\n                  <div class=\"imgs-empty\"\n                  v-if=\"!modalData.imagesUrl.length\"\n                  v-for=\"(img, i) in 3\" :key=\"i\">\n                  <span class=\"material-icons\">photo</span>\n                </div>\n\n                  <div class=\"imgs-fill\"\n                  v-else \n                  v-for=\"(img, key) in modalData.imagesUrl\"\n                  :key=\"key\"> \n                    <span class=\"remove material-icons\" role=\"button\"\n                    @click=\"removeImage(img, key)\">\n                      remove\n                    </span>\n                    <img class=\"img-thumbnail\" :src=\"img\" alt=\"\">\n                    <div class=\"form-check form-check-inline img-mark\">\n                      <input class=\"form-check-input me-1 mb-1\" type=\"radio\" name=\"main\" :value=\"img\" :id=\"'radio' + (key+1)\"\n                      @click=\"selectMainImage(img)\"\n                      :checked=\"img == modalData.imageUrl\">\n                      <label class=\"form-check-label\"\n                      role=\"button\"\n                      :for=\"'radio' + (key+1)\">\u8A2D\u5B9A\u4E3B\u5716</label>\n                    </div>\n                  </div> \n                </div>\n                <div class=\"form-group\">\n                  <label class=\"py-2\" for=\"imagesUrl\">\u5716\u7247\u9023\u7D50</label>\n                  <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\"\n                    id=\"imagesUrl\"\n                    placeholder=\"\u8F38\u5165\u5716\u7247\u9023\u7D50\"\n                    v-model=\"tempUrl\"\n                    :disabled=\"modalData.imagesUrl.length >= 3\">\n                    <button class=\"btn btn-outline-secondary\"\n                    :disabled=\"modalData.imagesUrl.length >= 3\"\n                    @click=\"uploadImage\">\n                      \u4E0A\u50B3\u9023\u7D50\n                    </button>\n                  </div>\n                  \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\"\n            data-bs-dismiss=\"modal\">\u53D6\u6D88</button>\n            <button type=\"button\" class=\"btn btn-primary\"\n            @click=\"$emit('update-product', modalData)\">\u5132\u5B58</button>\n          </div>\n        </div>\n      </div>\n    </div>",
  props: ['modalData', 'modalTitle'],
  data: function data() {
    return {
      tempUrl: ''
    };
  },
  methods: {
    uploadImage: function uploadImage() {
      var _this = this;

      if (this.tempUrl.trim() !== '') {
        var isRepeat = this.modalData.imagesUrl.find(function (item) {
          return item === _this.tempUrl;
        });

        if (isRepeat) {
          alert('連結網址不可重複');
        } else {
          this.modalData.imagesUrl.push(this.tempUrl);
          this.tempUrl = '';
        }

        if (!this.modalData.imageUrl) {
          this.modalData.imageUrl = this.modalData.imagesUrl[0];
        }
      } else {
        alert('請輸入連結網址');
      }
    },
    removeImage: function removeImage(item, key) {
      var result = this.modalData.imagesUrl.filter(function (img, idx) {
        return key !== idx;
      });
      this.modalData.imagesUrl = result;
    },
    selectMainImage: function selectMainImage(img) {
      this.modalData.imageUrl = img;
    }
  }
};