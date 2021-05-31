export default {
  template: `
  <nav v-show="pages.total_pages > 1">
    <ul class="pagination">
      <li class="page-item"
        :class="pages.has_pre ? '' : 'disabled'">
        <a class="page-link" href="#"
        @click.prevent="$emit('get-products', pages.current_pages - 1)">
          <span>&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="(num, idx) in pages.total_pages" 
        :key="idx"
        :class="num == pages.current_page ? 'active' : ''">
        <a class="page-link" href="#">{{ num }}</a>
      </li>
      <li class="page-item"
      :class="pages.has_next ? '' : 'disabled'">
        <a class="page-link" href="#"
          @click.prevent="$emit('get-products', pages.current_page + 1)">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  props: ['pages'],
  data () {
    return {}
  }
}