<template>
  <div id="app">
    <kr-cascader
      ref="cascader"
      :boxTitle="title"
      :boxOperation="operation"
      :dataObj="dataObj"
      :selectedData="selectedData"
      @onChange="onChangeData"
    ></kr-cascader>
    <el-button style="margin: 50px;" @click="getData(1)">获取数据</el-button>
    <kr-paging
      ref="paging"
      :dataList="dataList"
      :selectedData="selectedData2"
      :pageSize="100"
      @onChange="onChangeData2"
    ></kr-paging>
    <el-button style="margin: 50px;" @click="getData(2)">获取数据</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: ['省份', '城市', '区县', '选中地域'],
      operation: [
        '添加选中省份',
        '添加选中城市',
        '添加选中区县',
        '删除选中地域'
      ],
      dataObj: {},
      selectedData: [],
      dataList: [],
      selectedData2: []
    }
  },
  created() {
    this.productData()
  },
  methods: {
    productData() {
      // 模拟异步
      setTimeout(() => {
        // cascader
        this.dataObj = {
          province: {
            '101101': '北京市',
            '101102': '天津市',
            '101103': '广东省',
            '101104': '山西省',
            '101105': '河北省',
            '101106': '广西壮族自治区',
            '101107': '甘肃省',
            '101108': '湖北省',
            '101109': '湖南省',
            '101110': '福建省',
            '101111': '内蒙古自治区',
            '101112': '青海省'
          },
          city: {
            '101101': [
              {
                id: 101101101112,
                label: '通州区'
              },
              {
                id: 101101101111,
                label: '房山区'
              }
            ],
            '101102': [
              {
                id: 101102101111,
                label: '西青区'
              },
              {
                id: 101102101112,
                label: '津南区'
              }
            ],
            '101103': [
              {
                id: 101102101351,
                label: '河源市'
              },
              {
                id: 101164001112,
                label: '惠州市'
              },
              {
                id: 101164181112,
                label: '深圳市'
              }
            ]
          },
          county: {
            '101164181112': [
              {
                id: 106105142126,
                label: '宝安区'
              },
              {
                id: 106105142125,
                label: '南山区'
              },
              {
                id: 106105143124,
                label: '罗湖区'
              },
              {
                id: 106105143125,
                label: '福田区'
              }
            ],
            '101102101351': [
              {
                id: 106105143124,
                label: '龙川县'
              },
              {
                id: 106105143125,
                label: '紫金县'
              }
            ],
            '101164001112': [
              {
                id: 106465133124,
                label: '惠阳区'
              },
              {
                id: 106197987125,
                label: '惠城区'
              }
            ]
          }
        }
        this.selectedData = [
          {
            id: '101101-101101101112',
            label: '北京市-通州区'
          },
          {
            id: '101103-101164001112-106197987125',
            label: '广东省-惠州市-惠城区'
          },
          {
            id: '101111',
            label: '内蒙古自治区'
          }
        ]
        // paging
        for (let i = 0; i < 2220; i++) {
          this.dataList.push({
            id: i,
            label: `这是第${i}条数据`
          })
        }
        this.selectedData2 = [
          {
            id: 0,
            label: '这是第0条数据'
          },
          {
            id: 5,
            label: '这是第5条数据'
          },
          {
            id: 6,
            label: '这是第6条数据'
          },
          {
            id: 8,
            label: '这是第8条数据'
          },
          {
            id: 9,
            label: '这是第9条数据'
          }
        ]
      }, 500)
    },
    onChangeData(val) {
      console.log('监听数据改变：', val)
    },
    onChangeData2(val) {
      console.log('监听数据改变：', val)
    },
    getData(index) {
      if (index === 1) {
        const data = this.$refs.cascader.getSelectedData()
        console.log('通过钩子获取：', data)
      } else {
        const data = this.$refs.paging.getSelectedData()
        console.log('通过钩子获取：', data)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #f60;
  border-bottom: 1px solid #d4d4d4;
}
a:hover {
  color: #ff3e3e;
}
</style>
