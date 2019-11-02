# krry-transfer

> 基于 Element UI 组件的多级多选穿梭框组件

## Example

![](https://ainyi.com/upload/npm/WechatIMG351.png)

![](https://ainyi.com/upload/npm/WechatIMG352.png)

## Specialty
1. 多级多选
2. 当勾选省级并添加，过滤备选框的当前省级，同时在已选框该省级的子级合并成一个省级
3. 当勾选市级并添加，过滤备选框的当前市级，同时在已选框该市级的子级合并成一个市级
4. 当从已选框中移除数据，针对移除的数据是省、市、区分别在备选框新增这些数据
5. 当父级勾选多个数据，下级方框展示的数据为最后勾选父级的子级集合
6. 当多个勾选的父级逐个取消勾选，下级方框展示的数据为上一次勾选父级的子级集合
7. 支持搜索

## Install

```bash
npm install krry-transfer --save
```

## Use

依赖 element checkbox、button 组件和样式

```js
import Vue from 'vue'
import krryTransfer from 'krry-transfer'

Vue.use(krryTransfer)
```

template：

```html
<template>
  <div>
    <krry-transfer
      :dataObj="dataObj"
      :selectedData="selectedData"
      @onChange="onChangeData"
    ></krry-transfer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        province: {
          '101101': '北京市',
          '101103': '广东省',
        },
        city: {
          '101103': [
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
            }
          ]
        }
      },
      selectedData: [
        {
          id: '101101-101101101112',
          label: '北京市-通州区'
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

## Browser Support
Modern browsers and Internet Explorer 10+.

## API

### Attributes

|name|type|default|description|
|:-|:-|:-|:-|
|boxTitle|Array|['省份', '城市', '区县', '选中地域']|按顺序指定每个方框的 title|
|boxOperation|Array|['添加选中省份', '添加选中城市', '添加选中区县', '删除选中地域']|按顺序指定每个方框的底部操作文案|
|dataObj|Object|{}|全部数据对象|
|selectedData|Object|{}|已选数据对象|

### Events

|name|params|description|
|:-|:-|:-|
|onChange|String: value：已选数据对象|当已选数据变化时触发的事件|

### Methods

|name|params|description|
|:-|:-|:-|
|getSelectedData|-|获取已选数据对象的钩子|

<br>

**注：dataList、selectedData 的数据格式如下**

**dataList（全部数据对象）：**

```js
dataObj: {
  province: {
    '省id': 'xx省'
  },
  city: {
    '省id': [
      {
        id: '市id',
        label: 'xx市'
      }
    ]
  },
  county: {
    '市id': [
      {
        id: '区id',
        label: 'xx区'
      }
    ]
  }
}
```

例如：
```js
dataObj: {
  province: {
    '101101': '北京市',
    '101102': '天津市',
    '101103': '广东省'
  },
  city: {
    '101101': [
      {
        id: 101101101112,
        label: '通州区'
      }
    ],
    '101103': [
      {
        id: 101102101351,
        label: '河源市'
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
      }
    ],
    '101102101351': [
      {
        id: 106105143124,
        label: '龙川县'
      }
    ]
  }
}
```

**selectedData（已选数据对象）：**

```js
selectedData: [
  {
    id: '101111',
    label: '内蒙古自治区'
  },
  {
    id: '101101-101101101112',
    label: '北京市-通州区'
  },
  {
    id: '101103-101164001112-106197987125',
    label: '广东省-惠州市-惠城区'
  }
]
```

## Donation
If you find KrryTransfer useful, you can buy me a cup of coffee

![pay](https://ainyi.com/upload/pay.jpg)



## About
npm：[krry-transfer](https://www.npmjs.com/package/krry-transfer)

Blog：[Krryblog](https://ainyi.com) 

GitHub：[krry-transfer](https://github.com/Krryxa/krry-transfer)

## LICENSE
[MIT](https://github.com/Krryxa/krry-transfer/blob/master/LICENSE)