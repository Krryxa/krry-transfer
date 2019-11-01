<template>
  <div class="krry-main">
    <!-- 仓库 -->
    <template v-if="warehousesList.length">
      <el-checkbox-group v-model="warehouseObj" @change="handleWhChange">
        <el-checkbox :label="item" v-for="(item,index) in warehousesList" :key="index">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </template>
    <!-- 地区 -->
    <krry-container
      :wareHousePro="provinceList"
      :wareHouseFlag="wareHouseFlag"
      :dataList="dataList"
      :selectedData="selectedData"
    ></krry-container>
  </div>
</template>

<script>
import krryContainer from './models/container'
export default {
  name: 'krry-transfer',
  props: {
    warehousesList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Object,
      default: () => {}
    },
    selectedData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    krryContainer
  },
  data() {
    return {
      warehouseObj: [], // 选中的仓库对象
      warehouse: [], // 仓库

      provinceList: [], // 仓库对应的省id
      wareHouseFlag: false // 分仓的省id加载完毕的标志
      // warehousesList: [
      //   // 仓库信息
      //   {
      //     key: "NH",
      //     name: "南海",
      //     province: [
      //       "101112" // 该仓库对应的省的id值
      //     ]
      //   },
      //   {
      //     key: "SH",
      //     name: "上海",
      //     province: ["101104", "101105"]
      //   },
      //   {
      //     key: "CD",
      //     name: "华南",
      //     province: ["101110"]
      //   },
      //   {
      //     key: "BJ",
      //     name: "北京",
      //     province: ["101106", "101107"]
      //   },
      //   {
      //     key: "HZ",
      //     name: "华中",
      //     province: ["101108", "101109"]
      //   }
      // ]
    }
  },
  created() {
    this.getWareHouses()
  },
  methods: {
    // 获取仓库数据
    async getWareHouses() {
      // 默认勾选所有仓库
      this.warehouseObj = this.warehousesList // 选中的仓库对象
      this.warehouse = this.warehousesList.map(val => val.key) // 选中的仓库id

      this.wareHouseFlag = true // 加载完毕
      // this.warehousesList 数组：[{key:'', province:[],},...]
      for (let val of this.warehousesList) {
        // 每个数组元素去空格后合并成一个数组
        this.provinceList = this.provinceList.concat(
          val['province'].map(vq => vq.trim())
        )
      }
    },
    // 点击某个仓库，对应地区联动选择，value - 已选择的仓库对象
    handleWhChange(value) {
      this.warehouse = value.map(val => val.key)
      // 先清空
      this.provinceList = []
      // value 数组：[{key:'', province:[],},...]
      for (let val of value) {
        // 每个数组元素去空格后合并成一个数组
        this.provinceList = this.provinceList.concat(
          val['province'].map(vq => vq.trim())
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.krry-main {
  min-width: 906px;
}
</style>
