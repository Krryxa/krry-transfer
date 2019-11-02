import krryCascader from './packages/cascader'
import krryPaging from './packages/paging'

const components = [krryCascader, krryPaging]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  krryCascader
}
