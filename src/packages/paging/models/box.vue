<template>
  <div class="el-transfer-panel district-panel">
    <div class="el-transfer-panel__header">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >{{title[titleId]}}</el-checkbox>
      <span class="check-number">{{checkedCities.length}}/{{districtListMock.length}}</span>
    </div>
    <div class="el-transfer-panel__body">
      <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
        <input
          type="text"
          v-model="searchWord"
          autocomplete="off"
          placeholder="请输入(在全局中搜索)"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
      <el-checkbox-group
        v-model="checkedCities"
        v-if="districtListMock.length > 0"
        @change="handleCheckedChange"
      >
        <el-checkbox
          v-for="item in districtListMock"
          class="el-transfer-panel__item"
          :label="item"
          :key="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <p class="no-data" v-else>无数据</p>
    </div>
    <div class="vip-footer">
      <el-button class="v-page" @click="prev" plain :disabled="disabledPre">上一页</el-button>
      <el-button class="v-page" @click="next" plain :disabled="disabledNex">下一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleId: {
      type: Number
    },
    districtList: {
      // 父组件传递的数据
      type: Array
    }
  },
  data() {
    return {
      title: ['渠道', '已选中'],
      districtListMock: [], // 展示的数据 （搜索和分页会自动修改这个数组）
      checkedCities: [], // 已选择，数据格式：[id,id,id...]
      isIndeterminate: false,
      checkAll: false,
      searchWord: '',
      len: 0,
      total: 0,
      pageIndex: 0,
      disabledPre: true,
      disabledNex: false
    }
  },
  created() {
    this.getDistrict()
  },
  watch: {
    // 搜索框的监听器
    searchWord(newWord) {
      this.$emit('search-word', newWord, this.titleId)
    },
    // districtListMock 和 checkAll 的监听器
    districtListMock() {
      // 当方框中无已选择的数据时，不能勾选checkBox
      if (this.checkedCities.length === 0) {
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    checkedCities(newWord) {
      this.$emit('check-disable', newWord, this.titleId)
    },
    // 当列表中无数据时，不能勾选checkBox
    checkAll() {
      this.checkAll = this.districtListMock.length === 0 ? false : this.checkAll
    }
  },
  methods: {
    // 分页数据
    getDistrict() {
      this.len = this.districtList.length
      this.total = Math.ceil(this.len / 200)
      this.pageIndex = 0
      this.pageData()
    },
    pageData() {
      this.checkedCities = []
      if (this.total > 1 && this.pageIndex < this.total - 1) {
        this.pageIndex === 0
          ? (this.disabledPre = true)
          : (this.disabledPre = false)
        this.disabledNex = false
        this.districtListMock = this.districtList.slice(
          this.pageIndex * 200,
          this.pageIndex * 200 + 200
        )
      } else {
        this.total > 1 ? (this.disabledPre = false) : (this.disabledPre = true)
        this.disabledNex = true
        this.districtListMock = this.districtList.slice(
          this.pageIndex * 200,
          this.len
        )
      }
    },
    // 上一页
    prev() {
      this.pageIndex > 0 && --this.pageIndex
      this.pageData()
    },
    // 下一页
    next() {
      this.pageIndex <= this.total - 1 && ++this.pageIndex
      this.pageData()
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
      this.checkedCities = val ? this.districtListMock.map(val => val) : []
      this.isIndeterminate = false
      // 子传父
      this.$emit('check-district', this.checkedCities)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.district-panel {
  width: 240px;

  .el-transfer-panel__body {
    height: 300px;
  }
  .el-checkbox-group {
    height: 230px;
    overflow: auto;
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
