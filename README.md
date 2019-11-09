# krry-transfer

> 基于 Element UI 的升级版穿梭框组件
1. 多级多选穿梭框（常用于省市区三级联动）
2. 针对数据量庞大的分页穿梭框

## Example
**kr-cascader**
![](https://ainyi.com/upload/npm/WechatIMG351.png)

![](https://ainyi.com/upload/npm/WechatIMG352.png)

**kr-paging**
![](https://ainyi.com/upload/npm/WechatIMG12.png)

## Specialty
**kr-cascader 多级多选穿梭框**
1. 多级多选
2. 当勾选省级并添加，过滤备选框的当前省级，同时在已选框该省级的子级合并成一个省级
3. 当勾选市级并添加，过滤备选框的当前市级，同时在已选框该市级的子级合并成一个市级
4. 当从已选框中移除数据，针对移除的数据是省、市、区分别在备选框新增这些数据
5. 当父级勾选多个数据，下级方框展示的数据为最后勾选父级的子级集合
6. 当多个勾选的父级逐个取消勾选，下级方框展示的数据为上一次勾选父级的子级集合
7. 支持搜索

**kr-paging 数据量庞大的分页穿梭框**
1. 实现分页
2. 搜索，在所有数据里搜索（不是在当前分页的数据里搜索），这样就不用在每个分页都搜索一次；搜索后的结果也会自动分页
3. 全选只在当前页里的全选
4. 穿梭框左右两个框的联动

## Install

```bash
npm install krry-transfer --save
```

## Use

依赖 Element checkbox、button 组件和样式

```js
import Vue from 'vue'
import krryTransfer from 'krry-transfer'

Vue.use(krryTransfer)

/* 
 * or 按需引入
 * import { krryCascader, krryPaging } from 'krry-transfer'
 *
 * Vue.use(krryCascader)
 * Vue.use(krryPaging)
 */
```

### kr-cascader

```html
<template>
  <div>
    <kr-cascader
      :dataObj="dataObj"
      :selectedData="selectedData"
    ></kr-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        province: {
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
  }
}
</script>
```

### kr-paging

```html
<template>
  <div>
    <kr-paging
      :dataList="dataList"
      :selectedData="selectedData"
      :pageSize="100"
    ></kr-paging>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          id: 0,
          label: '这是第0条数据'
        },
        {
          id: 1,
          label: '这是第1条数据'
        }
      ],
      selectedData: [
        {
          id: 0,
          label: '这是第0条数据'
        }
      ]
    }
  }
}
</script>
```

## Browser Support
Modern browsers and Internet Explorer 10+.

## API ( kr-cascader )

### Attributes

|name|type|default|description|
|:-|:-|:-|:-|
|boxTitle|Array|['省份', '城市', '区县', '选中地域']|按顺序指定每个方框的 title|
|boxOperation|Array|['添加省份', '添加城市', '添加区县', '删除地域']|按顺序指定每个方框底部的操作文案|
|dataObj|Object|{}|kr-cascader 的数据源|
|selectedData|Array|[]|已选数据集合|

### Events

|name|params|description|
|:-|:-|:-|
|onChange|String: value：已选数据集合|当已选数据变化时触发的事件|

### Methods

|name|params|description|
|:-|:-|:-|
|getSelectedData|-|获取已选数据集合的钩子|

<br>

**注：dataObj、selectedData 的数据格式如下**

**dataObj（kr-cascader 的数据源）：**

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

**selectedData（已选数据集合）：**

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

## API ( kr-paging )

### Attributes

|name|type|default|description|
|:-|:-|:-|:-|
|boxTitle|Array|['待选区', '已选中']|按顺序指定每个方框的 title|
|pageSize|Number|160|分页大小|
|dataList|Array|[]|kr-paging 的数据源|
|selectedData|Array|[]|已选数据集合|

### Events

|name|params|description|
|:-|:-|:-|
|onChange|String: value：已选数据集合|当已选数据变化时触发的事件|

### Methods

|name|params|description|
|:-|:-|:-|
|getSelectedData|-|获取已选数据集合的钩子|


## Donation
If you find KrryTransfer useful, you can buy me a cup of coffee

![pay](https://ainyi.com/upload/pay.jpg)

## Example of applying this component
Example of applying this component：[Example](https://github.com/Krryxa/my-transfer)


## About
npm：[krry-transfer](https://www.npmjs.com/package/krry-transfer)

Blog：[Krryblog](https://ainyi.com/81) 

GitHub：[krry-transfer](https://github.com/Krryxa/krry-transfer)

## LICENSE
[MIT](https://github.com/Krryxa/krry-transfer/blob/master/LICENSE)