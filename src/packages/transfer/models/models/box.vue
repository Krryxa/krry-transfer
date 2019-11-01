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
          placeholder="请输入搜索内容"
          class="el-input__inner"
        />
        <span class="el-input__prefix" style="left: 0px;">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
      <el-checkbox-group
        v-model="checkedCities"
        v-if="districtListMock.length > 0"
        @change="handleCheckedChange"
      >
        <el-checkbox
          v-for="city in districtListMock"
          class="el-transfer-panel__item"
          :label="city"
          :key="city.id"
        >{{city.text}}</el-checkbox>
      </el-checkbox-group>
      <p class="no-data" v-else>无数据</p>
    </div>
    <div class="vip-footer">
      <el-button
        type="text"
        :disabled="checkedCities.length > 0 ? false : true"
        size="small"
        round
        @click="checkedSelected"
      >
        <span>{{operation}}</span>
      </el-button>
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
      // 父组件传递的区域数据
      type: Array
    },
    operation: {
      type: String
    }
  },
  data() {
    return {
      title: ['省份', '城市', '区县', '选中地区'],
      districtListMock: [], // 展示的数据 （搜索会自动修改这个数组）
      checkedCities: [], // 已选择，数据格式：[区域id,id,id...]
      father: {}, // 父级数据
      isIndeterminate: false,
      checkAll: false,
      searchWord: '',
      buttonAble: true
    }
  },
  created() {
    this.getDistrict()
  },
  watch: {
    // 搜索框的监听器
    searchWord(newWord, oldWord) {
      // 重新获取数据
      this.districtListMock = this.districtList
      // 过滤掉数据，保留搜索的数据
      this.districtListMock = this.districtListMock.filter(val =>
        val.text.includes(newWord)
      )
    },
    // 当点击省级或市级，自动监听并更新市级或区级的列表
    districtList() {
      this.getDistrict()
      // 如果区域数据为空，则已选择的数据也要清空
      if (this.districtList.length === 0) {
        this.checkedCities = []
      }
    },
    // districtListMock 和 checkAll 的监听器
    districtListMock() {
      // 当方框中无已选择的数据时，不能勾选checkBox
      if (this.checkedCities.length === 0) {
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    // 当列表中无数据时，不能勾选checkBox
    checkAll() {
      this.checkAll = this.districtListMock.length === 0 ? false : this.checkAll
    }
  },
  methods: {
    // 获取区域数据
    getDistrict() {
      this.districtListMock = this.districtList
      // 已选择的清空
      this.checkedCities = []
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
    },
    // 添加至已选 或 删除已选区域
    checkedSelected() {
      let selectedList = []
      let filterId = []
      if (this.titleId === 0) {
        // 省级添加
        for (let val of this.checkedCities) {
          selectedList.push({
            id: val.id,
            text: val.text
          })
          filterId.push(val.id)
        }
        this.$emit('selected-checked', selectedList, filterId)
      } else if (this.titleId === 1 || this.titleId === 2) {
        // 市级或县级添加
        for (let val of this.checkedCities) {
          selectedList.push({
            id: this.father.id + '-' + val.id,
            text: this.father.text + '-' + val.text
          })
          filterId.push(val.id)
        }
        this.$emit('selected-checked', selectedList, filterId)
      } else {
        // 删除已选区域
        for (let val of this.checkedCities) {
          selectedList.push({
            id: val.id,
            text: val.text
          })
        }
        this.$emit('delete-checked', selectedList)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.district-panel {
  width: 200px;

  .el-transfer-panel__header {
    .el-checkbox {
      display: inline-block;
    }
  }
  .el-transfer-panel__body {
    height: 288px;
  }
  .el-checkbox-group {
    height: 240px;
    overflow: auto;

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
    padding: 5px 0;
    text-align: center;
    border-top: 1px solid #ebeef5;
  }
}
</style>
