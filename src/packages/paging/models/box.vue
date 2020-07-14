<template>
  <div class="el-transfer-panel district-panel">
    <div class="el-transfer-panel__header">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >{{title}}</el-checkbox>
      <span class="check-number">{{checkedData.length}}/{{districtListMock.length}}</span>
    </div>
    <div class="el-transfer-panel__body">
      <div
        v-if="filterable"
        class="el-transfer-panel__filter el-input el-input--small el-input--prefix"
      >
        <input
          type="text"
          v-model="searchWord"
          autocomplete="off"
          @change="handleKeyword"
          :placeholder="filterPlaceholder"
          class="el-input__inner"
        />
        <span class="el-input__prefix" style="left: 0px;">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
      <el-checkbox-group
        :class="{ expand: !filterable }"
        v-model="checkedData"
        v-if="districtListMock.length > 0"
        @change="handleCheckedChange"
      >
        <el-checkbox
          v-for="(item, index) in districtListMock"
          class="el-transfer-panel__item"
          :title="item.label"
          :label="item"
          :key="index"
        >
          <span v-html="isHighlight ? filterHighlight(item.label) : item.label"></span>
        </el-checkbox>
      </el-checkbox-group>
      <p class="no-data" v-else>无数据</p>
    </div>
    <div class="vip-footer">
      <el-button
        class="v-page"
        @click="prev"
        plain
        :disabled="asyncSearch || disabledPre"
      >{{ pageTexts[0] }}</el-button>
      <el-button
        class="v-page"
        @click="next"
        plain
        :disabled="asyncSearch || disabledNex"
      >{{ pageTexts[1] }}</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    title: {
      type: String
    },
    operateId: {
      type: Number
    },
    dataShowList: {
      type: Array
    },
    pageSize: {
      type: Number
    },
    filterable: {
      type: Boolean
    },
    filterPlaceholder: {
      type: String
    },
    pageTexts: {
      type: Array
    },
    async: {
      type: Boolean,
      default: () => false // 已选区不做异步
    },
    isLastPage: {
      type: Boolean
    },
    isHighlight: {
      type: Boolean
    },
    asyncSearchFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      districtListMock: [], // 展示的数据 （搜索和分页会自动修改这个数组）
      checkedData: [], // 已选择，数据格式：[id,id,id...]
      isIndeterminate: false,
      checkAll: false,
      searchWord: '',
      len: 0,
      total: 0,
      pageIndex: 0,
      disabledPre: true,
      disabledNex: false,
      asyncSearch: false, // 异步搜索的标记
      asyncPageIndex: 1 // 异步分页的 pageIndex
    }
  },
  created() {
    this.initData()
  },
  watch: {
    // 搜索框的监听器
    searchWord(newWord) {
      this.$emit('search-word', newWord, this.operateId)
    },
    // districtListMock 和 checkAll 的监听器
    districtListMock() {
      // 当方框中无已选择的数据时，不能勾选checkBox
      if (this.checkedData.length === 0) {
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    checkedData(newWord) {
      this.$emit('check-disable', newWord, this.operateId)
    },
    // 当列表中无数据时，不能勾选checkBox
    checkAll() {
      this.checkAll = this.districtListMock.length === 0 ? false : this.checkAll
    },
    dataShowList: {
      handler() {
        this.async ? this.asyncInitData() : this.initData()
      },
      deep: true
    }
  },
  methods: {
    handleKeyword() {
      this.asyncSearchFlag && this.$emit('get-data-by-keyword', this.searchWord)
    },
    // 分页数据
    initData() {
      this.len = this.dataShowList.length
      this.total = Math.ceil(this.len / this.pageSize)
      this.pageIndex = 0
      this.pageData()
    },
    pageData() {
      this.checkedData = []
      if (this.total > 1 && this.pageIndex < this.total - 1) {
        this.pageIndex === 0
          ? (this.disabledPre = true)
          : (this.disabledPre = false)
        this.disabledNex = false
        this.districtListMock = this.dataShowList.slice(
          this.pageIndex * this.pageSize,
          this.pageIndex * this.pageSize + this.pageSize
        )
      } else {
        this.total > 1 ? (this.disabledPre = false) : (this.disabledPre = true)
        this.disabledNex = true
        this.districtListMock = this.dataShowList.slice(
          this.pageIndex * this.pageSize,
          this.len
        )
      }
    },
    // 异步获取的数据，检查分页按钮可用性
    asyncInitData() {
      // 取消勾选
      this.checkedData = []
      // 分页按钮可用性
      this.disabledNex = this.isLastPage
      this.disabledPre = this.asyncPageIndex <= 1
      // 赋值
      this.districtListMock = this.dataShowList
    },
    // 上一页
    prev() {
      if (this.async) {
        // 异步获取数据
        this.disabledPre = true
        this.$emit('get-data', --this.asyncPageIndex)
      } else {
        this.pageIndex > 0 && --this.pageIndex
        this.pageData()
      }
    },
    // 下一页
    next() {
      if (this.async) {
        // 异步获取数据
        this.disabledNex = true
        this.$emit('get-data', ++this.asyncPageIndex)
      } else {
        this.pageIndex <= this.total - 1 && ++this.pageIndex
        this.pageData()
      }
    },
    // 单选
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.districtListMock.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.districtListMock.length
      // 子传父
      this.$emit('check-district', value)
    },
    // 全选
    handleCheckAllChange(val) {
      this.checkedData = val ? this.districtListMock.map(val => val) : []
      this.isIndeterminate = false
      // 子传父
      this.$emit('check-district', this.checkedData)
    },
    filterHighlight(label) {
      const filterWord = this.searchWord.trim()
      label = label && label.trim()
      if (filterWord && label) {
        let reg = new RegExp(filterWord)
        return label.replace(reg, `<span class="red">${filterWord}</span>`)
      } else {
        return label
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.district-panel {
  width: 240px;

  .el-transfer-panel__header {
    .el-checkbox {
      display: inline-block;
    }
  }
  .el-transfer-panel__body {
    height: 292px;
    padding: 6px 0;

    .el-transfer-panel__filter {
      margin: 6px 14px 12px;
      line-height: 0;
    }
  }
  .el-checkbox-group {
    height: 240px;
    overflow: auto;
    &.expand {
      height: 290px;
    }

    .el-transfer-panel__item {
      display: block;
    }
  }
  .check-number {
    position: absolute;
    right: 15px;
    top: 0;
    color: #909399;
    font-size: 12px;
    font-weight: 400;
  }
  .no-data {
    font-size: 14px;
    margin: 0;
    height: 30px;
    line-height: 30px;
    padding: 6px 15px 0;
    color: #909399;
    text-align: center;
  }
  .vip-footer {
    position: relative;
    margin: 0;
    text-align: center;
    border-top: 1px solid #ebeef5;

    .v-page {
      float: left;
      width: 50%;
      border: none;
      margin: 0;
      border-radius: 0;
    }
  }
}
</style>
<style>
.red {
  color: #ff2b2b;
}
</style>
