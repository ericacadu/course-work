export default {
  template: "\n  <nav v-show=\"pages.total_pages > 1\">\n    <ul class=\"pagination\">\n      <li class=\"page-item\"\n        :class=\"pages.has_pre ? '' : 'disabled'\">\n        <a class=\"page-link\" href=\"#\"\n        @click.prevent=\"$emit('get-products', pages.current_pages - 1)\">\n          <span>&laquo;</span>\n        </a>\n      </li>\n      <li class=\"page-item\"\n        v-for=\"(num, idx) in pages.total_pages\" \n        :key=\"idx\"\n        :class=\"num == pages.current_page ? 'active' : ''\">\n        <a class=\"page-link\" href=\"#\">{{ num }}</a>\n      </li>\n      <li class=\"page-item\"\n      :class=\"pages.has_next ? '' : 'disabled'\">\n        <a class=\"page-link\" href=\"#\"\n          @click.prevent=\"$emit('get-products', pages.current_page + 1)\">\n          <span>&raquo;</span>\n        </a>\n      </li>\n    </ul>\n  </nav>",
  props: ['pages'],
  data: function data() {
    return {};
  }
};