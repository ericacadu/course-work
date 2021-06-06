export default {
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
  props: ['deleteData', 'modalTitle', 'modalText']
}
