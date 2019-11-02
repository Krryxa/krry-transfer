<template>
  <div>
    <krry-box
      ref="noSelect"
      :titleId="0"
      :district-list="dataListNoCheck"
      @check-district="noCheckSelect"
      @search-word="searchWord"
      @check-disable="checkDisable"
    ></krry-box>
    <div class="opera">
      <el-button
        icon="el-icon-arrow-left"
        type="primary"
        circle
        @click="deleteData"
        :disabled="disablePre"
      ></el-button>
      <el-button
        icon="el-icon-arrow-right"
        type="primary"
        circle
        @click="addData"
        :disabled="disableNex"
      ></el-button>
    </div>
    <krry-box
      ref="hasSelect"
      :titleId="1"
      :district-list="selectListCheck"
      @check-district="hasCheckSelect"
      @search-word="searchWord"
      @check-disable="checkDisable"
    ></krry-box>
  </div>
</template>

<script>
import krryBox from './models/box'
export default {
  name: 'kr-paging',
  props: {
    dataList: {
      type: Array
    }
  },
  components: {
    krryBox
  },
  data() {
    return {
      notSelectDataList: [], // 未选中（已过滤出已选)的数据
      // 默认已选的数据
      selectList: [
        {
          id: 0,
          name: '这是第0条数据'
        },
        {
          id: 5,
          name: '这是第5条数据'
        },
        {
          id: 6,
          name: '这是第6条数据'
        },
        {
          id: 8,
          name: '这是第8条数据'
        },
        {
          id: 9,
          name: '这是第9条数据'
        }
      ], // 已选中的数据，传递到子组件的数据

      dataListNoCheck: [], // 未选中的（或已搜索）传递到子组件的数据
      selectListCheck: [], // 已选中的（或已搜索）传递到子组件的数据

      noCheckData: [], // 未选中区域的已勾选的数据（待添加到已选区域)
      hasCheckData: [], // 已选中区域的已勾选的数据（从未选区域中待删除)

      noSelectkeyword: '',
      haSelectkeyword: '',

      disablePre: true,
      disableNex: true
    }
  },
  created() {
    this.getDistrict()
  },
  computed: {
    // 传递到后台保存的数据（已选中的数据的 id 数组）
    selectIdList() {
      return this.selectList.map(item => item.id)
    }
  },
  methods: {
    // 分页数据，初始化数据
    getDistrict() {
      this.selectListCheck = this.selectList
      this.notSelectDataList = this.dataList.filter(item1 => {
        return this.selectListCheck.every(item2 => item2.id !== item1.id)
      })
      this.dataListNoCheck = this.notSelectDataList
    },
    searchWord(keyword, titleId) {
      // 过滤掉数据，保留搜索的数据
      if (titleId === 0) {
        this.noSelectkeyword = keyword
        this.dataListNoCheck = this.notSelectDataList.filter(val =>
          val.name.includes(keyword)
        )
      } else {
        this.haSelectkeyword = keyword
        this.selectListCheck = this.selectList.filter(val =>
          val.name.includes(keyword)
        )
      }
      let refsName = titleId === 0 ? 'noSelect' : 'hasSelect'
      // 延迟执行
      setTimeout(() => {
        this.$refs[refsName].getDistrict()
      }, 0)
    },
    // 检查左右按钮可用性
    checkDisable(data, id) {
      if (id === 0) {
        data.length > 0 ? (this.disableNex = false) : (this.disableNex = true)
      } else {
        data.length > 0 ? (this.disablePre = false) : (this.disablePre = true)
      }
    },
    // 未选中区域的选泽
    noCheckSelect(val) {
      this.noCheckData = val
    },
    // 已选中区域的选泽
    hasCheckSelect(val) {
      this.hasCheckData = val
    },
    // 关键：把未选择的数据当做已选择的过滤数组，把已选择的数据当做未选择的过滤数组，在全局data进行过滤，最后进行一次搜索
    // 添加至已选
    addData() {
      this.notSelectDataList = this.notSelectDataList.filter(item1 => {
        return this.noCheckData.every(item2 => item2.id !== item1.id)
      })
      // 为了排序，选择这种复杂方法，从固定不变的所有数据 dataList 中过滤，顺序就不会乱
      this.selectList = this.dataList.filter(item1 => {
        return this.notSelectDataList.every(item2 => item2.id !== item1.id)
      })
      // 为了排序，舍弃这种效率更高的方法，从而选择上面那种方式
      // this.selectList = Array.from(dataFilter);
      // 搜索一次
      this.searchWord(this.noSelectkeyword, 0)
      this.searchWord(this.haSelectkeyword, 1)
    },
    // 从已选中删除
    deleteData() {
      this.selectList = this.selectList.filter(item1 => {
        return this.hasCheckData.every(item2 => item2.id !== item1.id)
      })
      this.notSelectDataList = this.dataList.filter(item1 => {
        return this.selectList.every(item2 => item2.id !== item1.id)
      })
      // 搜索一次
      this.searchWord(this.noSelectkeyword, 0)
      this.searchWord(this.haSelectkeyword, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.inner-center {
  margin: 0 5px;
}
.opera {
  position: relative;
  width: 100px;
  display: inline-block;

  .el-button.is-circle {
    border-radius: 50%;
    padding: 12px;
    display: block;
    margin: 25px auto;
  }
}
</style>
