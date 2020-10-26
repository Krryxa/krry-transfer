<template>
  <div class="krry-main">
    <!-- 地区 -->
    <krry-container
      :boxTitle="boxTitle"
      :boxOperation="boxOperation"
      :dataObj="dataObj"
      :selectedData="selectedData"
      :onChangeSelected="emitChangeSelected"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
    ></krry-container>
  </div>
</template>

<script>
import krryContainer from './models/container'
export default {
  name: 'kr-cascader',
  props: {
    boxTitle: {
      type: Array,
      default: () => ['省份', '城市', '区县', '选中地域']
    },
    boxOperation: {
      type: Array,
      default: () => ['添加省份', '添加城市', '添加区县', '删除地域']
    },
    dataObj: {
      type: Object,
      default: () => {}
    },
    selectedData: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: () => false
    },
    filterPlaceholder: {
      type: String,
      default: () => '请输入搜索内容'
    }
  },
  components: {
    krryContainer
  },
  data() {
    return {
      hasSelectData: []
    }
  },
  created() {},
  watch: {},
  methods: {
    // 获取已选数据的监听事件
    emitChangeSelected(val) {
      this.hasSelectData = val
      this.$emit('onChange', val)
    },
    // 提供获取已选数据的钩子
    getSelectedData() {
      return this.hasSelectData
    }
  }
}
</script>

<style lang="scss" scoped>
.krry-main {
  min-width: 906px;
}
</style>
