<template>
  <div>
    <krry-box
      ref="prov"
      :operation="boxOperation[0]"
      :title="boxTitle[0]"
      :operateId="0"
      :district-list="provinceList"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      @check-district="checkProvince"
      @selected-checked="selectedProvince"
    ></krry-box>
    <krry-box
      ref="city"
      :operation="boxOperation[1]"
      :title="boxTitle[1]"
      :operateId="1"
      :district-list="cityList"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      @check-district="checkCity"
      @selected-checked="selectedCity"
    ></krry-box>
    <krry-box
      ref="county"
      :operation="boxOperation[2]"
      :title="boxTitle[2]"
      :operateId="2"
      :district-list="countyList"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      @selected-checked="selectedCountry"
    ></krry-box>
    <span class="inner-center el-icon-d-arrow-right"></span>
    <krry-box
      style="width: 260px"
      :operation="boxOperation[3]"
      :title="boxTitle[3]"
      :district-list="checkedDistrict"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      @delete-checked="deleteCheck"
    ></krry-box>
  </div>
</template>

<script>
import krryBox from './models/box'
export default {
  props: {
    // 分仓对应的省id
    wareHousePro: {
      type: Array
    },
    wareHouseFlag: {
      type: Boolean
    },
    boxTitle: {
      type: Array
    },
    boxOperation: {
      type: Array
    },
    // 地域数据
    dataObj: {
      type: Object
    },
    // 已选数据
    selectedData: {
      type: Array
    },
    onChangeSelected: {
      type: Function
    },
    filterable: {
      type: Boolean
    },
    filterPlaceholder: {
      type: String
    }
  },
  components: {
    krryBox
  },
  data() {
    return {
      flag: false, // 分仓对应的省id变量的监听器的锁，第一次触发不执行，数据还未初始化
      provinceList: [], // 省级数据
      cityList: [], // 市级数据
      countyList: [], // 区县级数据
      checkedDistrict: [], // 已选数据
      filterProvince: [], // 省级过滤id
      filterCity: [], // 市级过滤id
      filterCounty: [] // 区县级过滤id
    }
  },
  computed: {
    // 映射出选中区域的数据Id
    selectDistrictId() {
      return this.checkedDistrict.map(val => val.id)
    }
  },
  watch: {
    dataObj: {
      handler() {
        this.getDistrict()
      },
      deep: true
    },
    selectedData: {
      handler() {
        this.getDistrict()
      },
      deep: true
    },
    // 监听点击分仓，所自动勾选的省
    wareHousePro(newVal, oldVal) {
      // 当区域数据和分仓数据加载后才能解锁
      if (this.flag && this.wareHouseFlag) {
        this.watchWarehouse(newVal, oldVal)
      }
    },
    checkedDistrict(newVal) {
      this.onChangeSelected(newVal)
    }
  },
  created() {
    this.getDistrict()
  },
  methods: {
    // 获取区域数据
    async getDistrict() {
      // 从后台传回经过处理的数据
      this.flag = true // 数据加载完成，解锁
      // 当分仓数据加载后才能解锁
      if (this.wareHouseFlag) {
        this.watchWarehouse(this.wareHousePro, []) // 执行一次分仓与区域选择的联动
      }
      // 执行已选数据的过滤
      this.checkedDistrict = JSON.parse(JSON.stringify(this.selectedData))
      this.initFilter(this.checkedDistrict)
      // 获取省级数据
      this.getProvince()
    },
    // 分仓对应的省id的监听器方法
    watchWarehouse(newVal, oldVal) {
      // 列举出已选的id
      let selectedId = this.checkedDistrict.map(val => val.id)
      let selectedIdAry = []
      let selectedArray = []

      // 循环新值，得出要勾选的省级id
      for (let val of newVal) {
        // 只找出没有包含的省，才添加进selectDistrict
        if (!selectedId.includes(val)) {
          // 查出对应省的名称
          let title = this.dataObj.province[val]
          // 省级id添加进selectedIdAry
          selectedIdAry.push(val)
          // 省级对象添加进selectedArray
          selectedArray.push({
            id: val,
            label: title
          })
        }
      }
      // 从省级添加到已选区域的方法，参数：第一个：省级对象数组，第二个：所选择的省级id数组
      this.selectedProvince(selectedArray, selectedIdAry)

      let deleteSelected = []
      // 循环旧值，得出取消勾选的省级id
      for (let val of oldVal) {
        // 进行比较，如果新值中不包含此id，就是要准备取消，并且第二个条件是必须是已经勾选，才能取消
        if (!newVal.includes(val) && selectedId.includes(val)) {
          // 查出对应省的名称
          let title = this.dataObj.province[val]
          // 省级对象添加进selectedArray
          deleteSelected.push({
            id: val,
            label: title
          })
        }
      }
      // 执行删除区域对象的方法，参数：要删除的区域对象数组
      this.deleteCheck(deleteSelected)
    },
    // 获取省级数据
    getProvince() {
      this.provinceList = [] // 首先清空
      for (let key in this.dataObj.province) {
        this.provinceList.push({
          id: key,
          label: this.dataObj.province[key]
        })
        // 省级过滤处理
        this.handleFilterProvince()
      }
    },
    // 获取市级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkProvince(val) {
      let obj = val[val.length - 1]
      let flag = true
      if (obj !== undefined) {
        let id = obj.id
        for (let key in this.dataObj.city) {
          if (id === key) {
            // 匹配到的id，将对应的市级数据传递到子组件
            this.cityList = this.dataObj.city[key]
            // 过滤处理
            this.handleFilterCity()
            // 过滤处理
            // 再清空上一次的县级数据
            this.countyList = []
            // 将父级对象放进市级组件
            this.$refs.city.father = {
              id: id,
              label: obj.label
            }
            flag = false
            break
          }
        }
      }
      // 如果市级没有匹配到，市级和区级都显示为空
      if (flag) {
        this.cityList = []
        this.countyList = []
      }
    },
    // 获取县级数据，子组件自定义的穿梭框传回的数据，val：[区域obj, 区域obj,...]
    checkCity(val) {
      let obj = val[val.length - 1]
      let flag = true
      if (obj !== undefined) {
        let id = obj.id
        for (let key in this.dataObj.county) {
          if (id.toString() === key) {
            // 匹配到的id，将对应的区级数据传递到子组件
            this.countyList = this.dataObj.county[key]
            // 过滤处理
            this.handleFilterCounty()
            // 获取省级的数据
            let fatherId = this.$refs.city.father.id
            let fatherText = this.$refs.city.father.label
            // 拼接上市级数据放进县级组件
            this.$refs.county.father = {
              id: fatherId + '-' + id,
              label: fatherText + '-' + obj.label
            }
            flag = false
            break
          }
        }
      }
      // 区级没有匹配到，显示为空
      if (flag) {
        this.countyList = []
      }
    },
    // 从省级添加到已选区域，参数：val：省级对象数组，filterId：所选择的省级id数组
    selectedProvince(val, filterId) {
      this.checkedDistrict = this.checkedDistrict.concat(val)
      this.filterProvince = this.filterProvince.concat(filterId)
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.checkedDistrict) {
          let selectId = vq.id.split('-')
          // 拆分的数组长度大于1，说明有市级以下的区域，合并成一个省级区域
          if (selectId.length > 1 && selectId[0] === val) {
            // 在已选择的区域中删除市级数据，合并成一个省级
            this.checkedDistrict = this.checkedDistrict.filter(vl => vl !== vq)
            // 当前省级已被合并，从过滤数组中删除该市级和县级数据
            this.filterCity = this.filterCity.filter(
              vf => vf.toString() !== selectId[1]
            )
            this.filterCounty = this.filterCounty.filter(
              vs => vs.toString() !== selectId[2]
            )
          }
        }
      }
      // 清空下面的市级和县级区域
      this.cityList = []
      this.countyList = []
      // 过滤处理
      this.handleFilterProvince()
    },
    // 从市级添加到已选区域
    selectedCity(val, filterId) {
      this.checkedDistrict = this.checkedDistrict.concat(val)
      this.filterCity = this.filterCity.concat(filterId)
      // 如果过滤的市级区域，还有县级区域，合并成一个市级
      for (let val of filterId) {
        for (let vq of this.checkedDistrict) {
          let selectId = vq.id.split('-')
          // 拆分的数组长度为3，说明有县级区域，并且该市级区域与当前加入市级区域的id相同，合并成一个市级区域
          if (selectId.length === 3 && selectId[1] === val.toString()) {
            // 在已选择的区域中删除县级数据，合并成一个市级
            this.checkedDistrict = this.checkedDistrict.filter(vl => vl !== vq)
            // 当前市级已被合并，从过滤数组中删除该县级数据
            this.filterCounty = this.filterCounty.filter(
              vs => vs.toString() !== selectId[2]
            )
          }
        }
      }
      // 清空下面的县级区域
      this.countyList = []
      // 过滤处理
      this.handleFilterCity()
    },
    // 从县级添加到已选区域
    selectedCountry(val, filterId) {
      this.checkedDistrict = this.checkedDistrict.concat(val)
      this.filterCounty = this.filterCounty.concat(filterId)
      // 过滤处理
      this.handleFilterCounty()
    },
    // 省级过滤处理
    handleFilterProvince() {
      let newPro = Array.from(this.provinceList)
      for (let val of this.filterProvince) {
        newPro = newPro.filter(vq => String(vq.id) !== String(val))
      }
      this.provinceList = Array.from(newPro)
    },
    // 市级过滤处理
    handleFilterCity() {
      let newCity = Array.from(this.cityList)
      for (let val of this.filterCity) {
        newCity = newCity.filter(vq => String(vq.id) !== String(val))
      }
      this.cityList = Array.from(newCity)
    },
    // 区县级过滤处理
    handleFilterCounty() {
      let newCounty = Array.from(this.countyList)
      for (let val of this.filterCounty) {
        newCounty = newCounty.filter(vq => String(vq.id) !== String(val))
      }
      this.countyList = Array.from(newCounty)
    },
    // 删除已选区域，参数：deleteVal：要删除的区域对象数组
    deleteCheck(deleteVal) {
      for (let val of deleteVal) {
        let selectId = val.id.split('-')
        let length = selectId.length
        switch (length) {
          case 1: {
            // 长度只有1，只有省级数据，删除对应省级的filter中的数据
            this.filterProvince = this.filterProvince.filter(
              vs => vs !== selectId[0]
            )
            // 重新获取县级数据
            this.getProvince()
            break
          }
          case 2: {
            // 长度为2，到达市级数据，删除对应市级的filter中的数据
            this.filterCity = this.filterCity.filter(
              vs => vs.toString() !== selectId[1]
            )
            // 重新获取市级数据
            if (this.$refs.prov.selectedDistrict.length) {
              // 省级已勾选才显示区级
              this.checkProvince([this.$refs.city.father])
            }
            break
          }
          case 3: {
            // 长度为3，到达县级数据，删除对应县级的filter中的数据
            this.filterCounty = this.filterCounty.filter(
              vs => vs.toString() !== selectId[2]
            )
            if (this.$refs.city.selectedDistrict.length) {
              // 市级已勾选才显示区级
              let fatherId = this.$refs.county.father.id.split('-')[1]
              let fatherText = this.$refs.county.father.label.split('-')[1]
              let obj = [{ id: fatherId, label: fatherText }]
              // 重新获取县级数据，参数：当前市级ID的对象数组：obj:[{id:id,label:label}]
              this.checkCity(obj)
            }
            break
          }
        }
        // 刷新已选区域
        this.checkedDistrict = this.checkedDistrict.filter(
          vd => vd.id !== val.id
        )
      }
    },
    // 初始化过滤器 参数：addVal：要增加的区域对象数组
    initFilter(addVal) {
      for (let val of addVal) {
        let selectId = val.id.split('-')
        let length = selectId.length
        switch (length) {
          case 1:
            this.filterProvince.push(selectId[0])
            break
          case 2:
            this.filterCity.push(selectId[1])
            break
          case 3:
            this.filterCounty.push(selectId[2])
            break
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.inner-center {
  margin: 0 5px;
}
</style>
