# krry-transfer

> 基于 Element UI 组件的多级多选穿梭框组件

## Example

![](https://raw.githubusercontent.com/Krryxa/my-transfer/master/resource/WechatIMG351.png)

![](https://raw.githubusercontent.com/Krryxa/my-transfer/master/resource/WechatIMG352.png)

## Specialty
1. 多级多选
2. 当勾选省级并添加，过滤备选框的当前省级，同时在已选框该省级的子级合并成一个省级
3. 当勾选市级并添加，过滤备选框的当前市级，同时在已选框该市级的子级合并成一个市级
4. 当从已选框中移除数据，又要针对移除的数据是省、市、区分别在备选框新增这些数据
5. 当父级勾选多个数据，下级方框展示的数据为最后勾选父级的子级集合
6. 当多个勾选的父级逐个取消勾选，下级方框展示的数据为上一次勾选父级的子级集合
7. 支持搜索

## Install

```bash
npm install krry-transfer --save
```

## Use

依赖 element 样式

```js
import Vue from 'vue'
import krryTransfer from 'krry-transfer'

Vue.use(krryTransfer)
```

```html
<template>
  <div>
    <krry-transfer
      :dataList="dataList"
      :selectedData="selectedData"
      @onChange="onChangeData"
    ></krry-transfer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {
        province: {
          '101101': '北京市',
          '101103': '广东省',
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
          ]
          '101103': [
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
            }
          ]
        }
      },
      selectedData: [
        {
          id: '101101-101101101112',
          text: '北京市-通州区'
        }
      ]
    }
  },
  methods: {
    onChangeData(val) {
      console.log('监听数据改变：', val)
    }
  }
}
</script>
```

## API

### Attributes

|name|type|default|description|
|-|-|-|-|
|boxTitle|Array|['省份', '城市', '区县', '选中地域']|按顺序指定每个方框的 title|
|boxOperation|Array|['添加选中省份', '添加选中城市', '添加选中区县', '删除选中地域']|按顺序指定每个方框的底部操作文案|
|dataList|Object|{}|全部数据对象|
|selectedData|Object|{}|已选数据对象|

<br>

### Events

|name|params|description|
|-|-|-|
|onChange|String: value：已选数据对象|当已选数据变化时触发的事件|

<br>

### Methods

|name|params|description|
|-|-|-|
|getSelectedData|-|获取已选数据对象的钩子|

<br>

**注：dataList、selectedData 的数据格式如下：**

**dataList**
```js
dataList: {
  province: {
    '101103': '广东省'
  },
  city: {
    '101103': [
      {
        id: 101102101351,
        text: '河源市'
      }
    ]
  },
  county: {
    '101102101351': [
      {
        id: 106105143124,
        text: '龙川县'
      }
    ]
  }
}
```

例如：
```js
dataList: {
  province: {
    '101101': '北京市',
    '101102': '天津市',
    '101103': '广东省',
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
}
```

**selectedData**

```js
selectedData: [
  {
    id: '101111',
    text: '内蒙古自治区'
  },
  {
    id: '101101-101101101112',
    text: '北京市-通州区'
  },
  {
    id: '101103-101164001112-106197987125',
    text: '广东省-惠州市-惠城区'
  }
]
```

## About
npm 地址：[krry-transfer](https://www.npmjs.com/package/krry-transfer)

博客地址：[Krryblog](https://ainyi.com) 

GitHub：[GitHub](https://github.com/Krryxa/krry-transfer)