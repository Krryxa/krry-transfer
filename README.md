# krry-transfer

> 基于 Element UI 的升级版穿梭框组件
1. 多级多选穿梭框（常用于省市区三级联动）
2. 针对数据量庞大的分页穿梭框

## Example
**kr-cascader**

![](https://ainyi.com/upload/npm/kr_cascader.gif)

![](https://ainyi.com/upload/npm/WechatIMG351.png)

**kr-paging**

![](https://ainyi.com/upload/npm/kr_paging.gif)

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
2. 没有设置异步时，搜索将在所有数据里搜索，这样就不用在每个分页都搜索一次，搜索后的结果会自动分页
3. 全选只在当前页里的全选
4. 添加已选/删除已选 将自动计算分页条目
5. 穿梭框左右两个框的联动
6. 支持分页异步请求数据
7. 支持分页搜索异步请求数据

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

每一项数据源格式如下：

```js
{
  id: 'xxx',
  label: 'xxx',
  disabled: true // 可选
}
```

id 为唯一标识，label 为显示文本，disabled 表示该项数据是否禁止转移，若没有 disabled 属性，则默认允许转移

### kr-cascader

```html
<template>
  <div>
    <kr-cascader
      :dataObj="dataObj"
      :selectedData="selectedData"
      @onChange="onChange"
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
              label: '深圳市',
              disabled: true // 支持禁用
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
    onChange(val) {
      console.log('已选中：', val)
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
      @onChange="onChange"
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
          label: '这是第1条数据',
          disabled: true // 支持禁用
        }
      ],
      selectedData: [
        {
          id: 0,
          label: '这是第0条数据'
        }
      ]
    }
  },
  methods: {
    onChange(val) {
      console.log('已选中：', val)
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
|filterable|Boolean|false|是否可搜索|
|filter-placeholder|String|请输入搜索内容|搜索框占位符|

### Events

|name|params|description|
|:-|:-|:-|
|onChange|Array: value（已选数据集合）|当已选区数据变化时触发的事件|

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
        label: 'xx市',
        disabled: true // 支持禁用
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
|dataList|Array&lt;dataItem&gt;|[]|kr-paging 的数据源|
|selectedData|Array&lt;dataItem&gt;|[]|已选数据集合|
|filterable|Boolean|false|是否可搜索|
|filter-placeholder|Array|['请输入搜索内容', '请输入搜索内容']|左右两边搜索框占位符|
|pageTexts|Array|['上一页', '下一页']|分页按钮文案|
|sort|Boolean|false|已选区数据是否根据待选区的数据进行排序，设置为 true 后，性能有所下降；当 async 为 true 时，sort 属性无效|
|async|Boolean|false|分页是否异步请求，当设置为 true，dataList 无需设置，请设置 getPageData 方法来获取分页数据|
|getPageData|Function|() => []|异步请求分页数据的方法，参数：pageIndex, pageSize|
|getSearchData|Function|-|异步搜索数据的方法，仅分页是异步请求时使用，参数：keyword, pageIndex, pageSize；搜索框失焦或回车执行|
|isHighlight|Boolean|false|搜索后关键词是否高亮展示|
|highlightColor|String|#ff2b2b|关键词高亮颜色值|
|showClearBtn|Boolean|false|是否在搜索框末尾展示清空按钮|

**dataItem**
|name|type|default|description|
|:-|:-|:-|:-|
|id|String &#124; Number|-|数据项唯一标识|
|label|String|-|数据项名称|
|disabled|Boolean|false|该项是否禁用|

### Events

|name|params|description|
|:-|:-|:-|
|onChange|value(已选数据集合 id)，moveKeys(移动的集合 id)|当已选区数据变化时触发的事件|

### Methods

|name|params|description|
|:-|:-|:-|
|getSelectedData|-|获取已选数据集合的钩子|
|clearQueryInp|String: 'left' / 'right'|清空某个面板的搜索框|
|getData|Number: pageIndex|异步获取分页数据的钩子|

<br>

**当设置分页异步请求接口数据时，设置方法如下：**

1. async 属性设置为 true
2. dataList 无需设置
3. 第一页和后续分页的数据都是通过设置 getPageData 属性方法获取
4. 可设置异步搜索的方法 getSearchData，待选区的搜索框将启用远程搜索（搜索框失焦或回车执行）

**注意：**
1. 此时 sort 属性无效；
2. 若没有设置异步搜索方法 getSearchData，待选区的搜索将在当前页搜索

> 若分页不是异步请求，即不设置 async 或 :async="false"，待选区的搜索将在所有数据中搜索，搜索后的结果会自动分页

```html
<!-- 可设置异步搜索方法：getSearchData -->
<kr-paging
  :selectedData="selectedData"
  :async="true"
  :getPageData="getPageData"
  :getSearchData="getSearchData"
></kr-paging>
```

类型为 Function 的绑定属性：getPageData、getSearchData 配置如下
|name|params|return|
|:-|:-|:-|
|getPageData|pageIndex, pageSize|[{id: xxx, label: xxx}...]|
|getSearchData|keyword, pageIndex, pageSize|[{id: xxx, label: xxx}...]|

```js
methods: {
  // 异步获取分页数据 待选区点击上一页/下一页执行
  async getPageData(pageIndex, pageSize) {
    // 掉接口请求数据
    const resData = await getData({
      pageIndex: pageIndex,
      pageSize: pageSize
    })
    // 将 resData 的数据结构处理成如 dataList、selectedData 一样
    return resData
  },
  // 异步搜索的方法配置如下 搜索框失焦或回车执行
  async getSearchData(keyword, pageIndex, pageSize) {
    // 掉接口请求数据
    const resData = await getDataByKeyword({
      keyword: keyword,
      pageIndex: pageIndex,
      pageSize: pageSize
    })
    // 将 resData 的数据结构处理成如 dataList、selectedData 一样
    return resData
  }
}
```


## Demo
在线 demo：
[省市级联动多选穿梭框](http://ele.ainyi.com/my-transfer)、
[分页穿梭框](http://ele.ainyi.com/my-transfer/#/mutiTransfer)

使用 krry-transfer 组件的示例 demo git：[my-transfer](https://github.com/Krryxa/my-transfer)

## About
npm：[krry-transfer](https://www.npmjs.com/package/krry-transfer)

Blog：[Krryblog](https://ainyi.com/81)

GitHub：[krry-transfer](https://github.com/Krryxa/krry-transfer)

## Donation
If you find KrryTransfer useful, you can buy me a cup of coffee

![pay](https://ainyi.com/upload/pay.jpg)

## LICENSE
[MIT](https://github.com/Krryxa/krry-transfer/blob/master/LICENSE)

## Remark
自组件发布以来，有不少人询问和提相关优化需求，我也优化了许多，但也有部分问题没有时间完善。<br>
还没支持 Vue3，这组件目前只有我一个人维护，很忙呀，有没有人帮忙一起完善呀，可以提 PR 哦。