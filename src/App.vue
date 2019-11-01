<template>
  <div id="app">
    <krry-transfer
      ref="krry"
      :boxTitle="title"
      :boxOperation="operation"
      :dataList="dataList"
      :selectedData="selectedData"
      @onChange="onChangeData"
    ></krry-transfer>
    <el-button style="margin-top: 100px;" @click="getData">获取数据</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: ['自定义省份', '城市', '区县', '请选择选中地域'],
      operation: [
        '添加选中省份',
        '添加选中城市',
        '添加选中区县（自定义）',
        '删除选中地域'
      ],
      dataList: {
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
              text: '通州区'
            },
            {
              id: 101101101111,
              text: '房山区'
            }
          ],
          '101102': [
            {
              id: 101102101111,
              text: '西青区'
            },
            {
              id: 101102101112,
              text: '津南区'
            }
          ],
          '101103': [
            {
              id: 101102101351,
              text: '河源市'
            },
            {
              id: 101164001112,
              text: '惠州市'
            },
            {
              id: 101164181112,
              text: '深圳市'
            }
          ]
        },
        county: {
          '101164181112': [
            {
              id: 106105142126,
              text: '宝安区'
            },
            {
              id: 106105142125,
              text: '南山区'
            },
            {
              id: 106105143124,
              text: '罗湖区'
            },
            {
              id: 106105143125,
              text: '福田区'
            }
          ],
          '101102101351': [
            {
              id: 106105143124,
              text: '龙川县'
            },
            {
              id: 106105143125,
              text: '紫金县'
            }
          ],
          '101164001112': [
            {
              id: 106465133124,
              text: '惠阳区'
            },
            {
              id: 106197987125,
              text: '惠城区'
            }
          ]
        }
      },
      selectedData: [
        {
          id: '101101-101101101112',
          text: '北京市-通州区'
        },
        {
          id: '101103-101164001112-106197987125',
          text: '广东省-惠州市-惠城区'
        },
        {
          id: '101111',
          text: '内蒙古自治区'
        }
      ]
    }
  },
  methods: {
    onChangeData(val) {
      console.log('数据改变得到', val)
    },
    getData() {
      const data = this.$refs.krry.getSelectedData()
      console.log('通过钩子得到', data)
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
