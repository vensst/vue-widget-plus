# Vue Widget Plus

一个基于 **Vue 3 + TypeScript** 的轻量级组件库，提供常用 UI 组件与业务组件封装，支持 **按需引入 / 全量注册 / 插件化配置**
，并内置对 **ECharts** 的统一注入方案。

---

## ✨ 特性

- 🚀 基于 Vue 3 + Vite 构建
- 💡 完整 TypeScript 类型声明
- 📦 支持按需引入 & 全量注册
- 🔌 插件化安装（`app.use`）
- 🧩 面向业务的组件设计（ScrollTable / Captcha / Chart 等）

---

## 📦 安装

```bash
npm install @vensst/vue-widget-plus
# 或
pnpm add @vensst/vue-widget-plus
# 或
yarn add @vensst/vue-widget-plus
```

## ⚙️ 快速开始

### 全量引入

```js
import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

import VueWidgetPlus from '@vensst/vue-widget-plus'
import '@vensst/vue-widget-plus/dist/index.css'

const app = createApp(App)

app.use(VueWidgetPlus, {
  $echarts: echarts
})

app.mount('#app')
```

### 按需引入

```js

import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

import {VwpScrollTable,} from '@vensst/vue-widget-plus'
import '@vensst/vue-widget-plus/dist/index.css'

const app = createApp(App)
app.use(VwpScrollTable)
app.mount('#app')

```

## 📚 组件文档

### Icon 图标

#### 使用

::: demo

```vue

<template>
  <div>
    <div>
      <VwpIcon name="drag"/>
      <VwpIcon name="close"/>
      <VwpIcon name="expand"/>
      <VwpIcon name="compress"/>
      <VwpIcon name="arrow-up"/>
      <VwpIcon name="arrow-right"/>
      <VwpIcon name="arrow-down"/>
      <VwpIcon name="arrow-left"/>
      <VwpIcon name="sound"/>
      <VwpIcon name="empty"/>
      <VwpIcon name="double-arrow-left"/>
      <VwpIcon name="double-arrow-right"/>
      <VwpIcon name="check-circle-fill"/>
    </div>
    <div>
      <VwpIcon name="up" :size="20" color="red"/>
    </div>
  </div>
</template>
```

:::

#### 属性

| 名称    | 说明   | 类型            | 可选值 | 默认值 |
|-------|------|---------------|-----|-----|
| name  | 图标名字 | String        | --  | --  |
| size  | 大小   | Number、String | --  | 1em |
| color | 颜色   | String        | --  | --  |

### Button 按钮

#### 使用

::: demo

```vue

<template>
  <div>
    <div>
      <VwpButton>default</VwpButton>
      <VwpButton type="primary">primary</VwpButton>
      <VwpButton type="success">success</VwpButton>
      <VwpButton type="warning">warning</VwpButton>
      <VwpButton type="danger">danger</VwpButton>
      <VwpButton type="info">info</VwpButton>
    </div>
    <div>
      <VwpButton>default</VwpButton>
      <VwpButton size="small" type="primary">small</VwpButton>
      <VwpButton size="large" type="primary">large</VwpButton>
      <VwpButton size="large" type="primary" disabled>small</VwpButton>
    </div>
    <div>
      <VwpButton disabled>disabled</VwpButton>
      <VwpButton type="primary" disabled>primary</VwpButton>
      <VwpButton type="success" disabled>success</VwpButton>
      <VwpButton type="warning" disabled>warning</VwpButton>
      <VwpButton type="danger" disabled>danger</VwpButton>
      <VwpButton type="info" disabled>info</VwpButton>
    </div>
    <div>
      <VwpButton plain>plain</VwpButton>
      <VwpButton type="primary" plain>primary</VwpButton>
      <VwpButton type="success" plain>success</VwpButton>
      <VwpButton type="warning" plain>warning</VwpButton>
      <VwpButton type="danger" plain>danger</VwpButton>
      <VwpButton type="info" plain>info</VwpButton>
    </div>
    <div>
      <VwpButton round>round</VwpButton>
      <VwpButton type="primary" round>primary</VwpButton>
      <VwpButton type="success" round>success</VwpButton>
      <VwpButton type="warning" round>warning</VwpButton>
      <VwpButton type="danger" round>danger</VwpButton>
      <VwpButton type="info" round>info</VwpButton>
    </div>
    <div>
      <VwpButton circle icon="close"></VwpButton>
      <VwpButton type="primary" circle icon="close"></VwpButton>
      <VwpButton type="success" circle icon="close"></VwpButton>
      <VwpButton type="warning" circle icon="close"></VwpButton>
      <VwpButton type="danger" circle icon="close"></VwpButton>
      <VwpButton type="info" circle icon="close"></VwpButton>
    </div>
    <div>
      <VwpButton type="primary">
        <VwpIcon name="close"/>
        关闭
      </VwpButton>
      <VwpButton type="primary"> 关闭
        <VwpIcon name="close"/>
      </VwpButton>
    </div>
  </div>
</template>
```

:::

#### 属性

| 名称       | 说明      | 类型      | 可选值                                         | 默认值     |
|----------|---------|---------|---------------------------------------------|---------|
| type     | 类       | String  | default、primary、success、warning、danger、info | default |
| size     | 大小      | String  | small、default、large                         | default |
| plain    | 是否为朴素按钮 | Boolean | --                                          | false   |
| round    | 是否为圆角按钮 | Boolean | --                                          | false   |
| circle   | 是否为圆形按钮 | Boolean | --                                          | false   |
| disabled | 是否为禁用按钮 | Boolean | --                                          | false   |
| icon     | 图标名     | String  | --                                          | --      |
| loading  | 是否为加载按钮 | Boolean | --                                          | false   |

#### 插槽

| 名称      | 说明  | 
|---------|-----|
| default | 	-- |

### ButtonGroup 按钮组

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpButtonGroup type="primary" size="small">
      <VwpButton icon="arrow-left"/>
      <VwpButton size="large">确认</VwpButton>
      <VwpButton loading/>
      <VwpButton icon="arrow-right" type="danger"></VwpButton>
    </VwpButtonGroup>

    <VwpButtonGroup vertical size="small">
      <VwpButton icon="arrow-left"/>
      <VwpButton size="large">确认</VwpButton>
      <VwpButton loading/>
      <VwpButton icon="arrow-right"></VwpButton>
    </VwpButtonGroup>
  </div>
</template>
```

:::

#### 属性

| 名称       | 说明   | 类型      | 可选值                                         | 默认值     |
|----------|------|---------|---------------------------------------------|---------|
| type     | 类型   | String  | default、primary、success、warning、danger、info | default |
| size     | 大小   | String  | small、default、large                         | default |
| vertical | 是否垂直 | Boolean | --                                          | false   |

#### 插槽

| 名称      | 说明  | 
|---------|-----|
| default | 	-- |

### Link 链接

#### 使用

::: demo

```vue

<template>
  <div>
    <div>
      <VwpLink>default</VwpLink>
      <VwpLink type="primary">primary</VwpLink>
      <VwpLink type="success">success</VwpLink>
      <VwpLink type="warning">warning</VwpLink>
      <VwpLink type="danger">danger</VwpLink>
      <VwpLink type="info">info</VwpLink>
    </div>
    <div>
      <VwpLink disabled>default</VwpLink>
      <VwpLink type="primary" disabled>primary</VwpLink>
      <VwpLink type="success" disabled>success</VwpLink>
      <VwpLink type="warning" disabled>warning</VwpLink>
      <VwpLink type="danger" disabled>danger</VwpLink>
      <VwpLink type="info" disabled>info</VwpLink>
    </div>
    <div>
      <VwpLink :underline="false">default</VwpLink>
      <VwpLink type="primary" :underline="false">primary</VwpLink>
      <VwpLink type="success" :underline="false">success</VwpLink>
      <VwpLink type="warning" :underline="false">warning</VwpLink>
      <VwpLink type="danger" :underline="false">danger</VwpLink>
      <VwpLink type="info" :underline="false">info</VwpLink>
    </div>
    <div>
      <VwpLink type="primary" href="https://www.baidu.com" target="_blank">百度一下</VwpLink>
    </div>
  </div>
</template>
```

:::

#### 属性

| 名称        | 说明     | 类型      | 可选值                                         | 默认值     |
|-----------|--------|---------|---------------------------------------------|---------|
| type      | 类型     | String  | default、primary、success、warning、danger、info | default |
| underline | 是否有下划线 | Boolean | --                                          | true    |
| disabled  | 是否为禁用  | Boolean | --                                          | false   |
| icon      | 图标名    | String  | --                                          | --      |
| href      | 地址     | String  | --                                          | --      |
| target    | 打开方式   | String  | _self、_blank                                | _self   |

#### 插槽

| 名称      | 说明  | 
|---------|-----|
| default | 	-- |

### Dialog 对话框

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpButton type="primary" @click="showDialog = !showDialog">打开</VwpButton>
    <VwpDialog v-model="showDialog">
      这是body内容
    </VwpDialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showDialog: false
      }
    }
  }
</script>
```

:::

#### 属性

| 名称              | 说明             | 类型      | 可选值               | 默认值   |
|-----------------|----------------|---------|-------------------|-------|
| v-model         | 	是否显示 Dialog   | Boolean | --                | false |
| title           | 标题             | String  | --                | --    |
| width           | 宽度             | String  | --                | 35%   |
| height          | 高度             | String  | --                | --    |
| headerAlign     | 头部对齐方式         | String  | left、center       | left  |
| footerAlign     | 底部对齐方式         | String  | left、center、right | right |
| isFullScreen    | 是否全屏           | Boolean | --                | false |
| isFullScreenBtn | 是否显示全屏按钮       | Boolean | --                | true  |
| isBoundary      | 拖动是否有边界        | Boolean | --                | true  |
| isLimitMinSize  | 是否限制最小大小       | Boolean | --                | true  |
| top             | 顶部外边距          | String  | --                | 15vh  |
| appendToBody    | 是否插入至 body 元素上 | Boolean | --                | false |
| appendTo        | 挂载到哪个 DOM 元素   | String  | --                | body  |

#### 插槽

| 名称      | 说明    | 
|---------|-------|
| default | 	主体内容 |
| title   | 	头部标题 |
| close   | 	关闭按钮 |
| footer  | 	底部内容 |

### ScrollTable  滚动表格

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpScrollTable :data="tableData"
                    :columns="cols"
                    :showHeader="true"
                    height="280px"
                    :headerHeight="40"
                    :rowsPerPage="4"
                    :interval="3000"
                    :autoStart="true"
                    emptyText="没有数据"
                    @row-click="handleRowClick"
                    :rowClassName="handleRowClassName"
                    headerRowClassName="header--style">
      <template #header-account>
        <vwp-button type="success" size="small">账号</vwp-button>
      </template>
      <template #account="{ row }">
        <VwpButton type="primary">{{ row.account }}</VwpButton>
      </template>
      <template #id="{ row }"> {{ row.id }}abcdefjhijklmnopqrstuvwxyz0123456789</template>
      <template #nickname="{ row }"> {{ row.nickname }}abcdefjhijklmnopqrstuvwxyz0123456789</template>
      <template #empty>
        <VwpButton type="primary">OK</VwpButton>
      </template>
    </VwpScrollTable>
  </div>
</template>
<script setup>
  import {ref} from 'vue'

  const tableData = ref([
    {
      id: 1,
      nickname: '张三',
      account: 'admin',
      name: '张三',
      phone: '12345678901',
      email: '<EMAIL>',
      address: '中国上海',
      createTime: '2021-01-01 00:00:00',
      updateTime: '2021-01-01 00:00:00',
      status: 1
    },
    {
      id: 2,
      nickname: '张三222',
      account: 'admin',
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ])
  const cols = ref([
    {key: 'id', title: 'ID', width: '120px'},
    {
      key: 'nickname',
      title: '名称',
      width: '120px',
      align: 'center',

      showOverflowTooltip: true
    },
    {key: 'account', title: '账号', align: 'center', headerAlign: 'right'}
  ])
  const handleRowClick = function (row, idx) {
    console.log(row, idx)
  }
  const handleRowClassName = function (row, index) {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }
</script>
```

:::

#### 属性

| 名称                 | 说明         | 类型              | 可选值 | 默认值  |
|--------------------|------------|-----------------|-----|------|
| data               | 数据源        | Array           | --  | --   |
| columns            | 配置，参考如下    | Array           | --  | --   |
| height             | 表格高度       | Number、String   | --  | 100% |
| maxHeight          | 表格最大高度     | Number、String   | --  | --   |
| showHeader         | 是否显示表头     | Boolean         | --  | --   |
| rowClassName       | 行的样式类名     | String、Function | --  | --   |
| headerRowClassName | 表头行的样式类名   | String、Function | --  | --   |
| headerHeight       | 表头高度       | Number          | --  | 40   |
| rowsPerPage        | 每页行数       | Number          | --  | 5    |
| interval           | 滚动间隔时间（毫秒） | Number          | --  | 3000 |
| autoStart          | 是否自动开始滚动   | Boolean         | --  | true |
| rowKeyField        | 行 key 字段   | String          | --  | --   |
| emptyText          | 空数据展示文案    | String          | --  | 暂无数据 |

#### columns

| 参数                  | 说明             | 类型            | 可选值               | 默认值  |
|---------------------|----------------|---------------|-------------------|------|
| key                 | 列取值字段          | String        | --                | --   |
| title               | 列标题            | String        | --                | --   |
| width               | 列宽             | String、Number | --                | --   |
| flex                | 弹性布局flex值      | string、Number | --                | 1    |
| align               | 对齐方式           | String        | left、center、right | left |
| headerAlign         | 表头对齐方式         | String        | left、center、right | left |
| showOverflowTooltip | 是否溢出显示为tooltip | Boolean       | --                | true |

##### 事件

| 名称        | 说明    | 参数           |
|-----------|-------|--------------|
| row-click | 点击行触发 | (row, index) |

##### 插槽

| 名称                  | 说明   |
|---------------------|------|
| columns.key名        | 列插槽  |
| header-columns.key名 | 表头插槽 |

### Speech 语音播放

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpInput v-model="message"></VwpInput>
    <VwpSpeech :message="message"></VwpSpeech>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        message: 'hello world'
      }
    }
  }
</script>
```

:::

#### 属性

| 名称       | 说明      | 类型      | 可选值 | 默认值 |
|----------|---------|---------|-----|-----|
| message  | 播放消息    | String  | --  | --  |
| auto     | 自动播放    | Boolean | --  | --  |
| disabled | 是否禁用    | Boolean | --  | --  |
| options  | 配置，参考如下 | Object  | --  | --  |

#### options

| 参数     | 说明      | 类型                   | 可选值    | 默认值 |
|--------|---------|----------------------|--------|-----|
| lang   | 语言，默认系统 | String               | --     | --  |
| volume | 音量      | Number               | 0-1    | 1   |
| rate   | 语速      | Number               | 0.1-10 | 1   |
| pitch  | 音高      | Number               | 0-2    | 1   |
| voice  | 语音      | SpeechSynthesisVoice | --     | --  |

##### 事件

| 名称    | 说明   | 参数 |
|-------|------|----|
| start | 播放开始 | -- |
| end   | 播放结束 | -- |
| error | 播放错误 | -- |

##### 方法

| 名称     | 说明   | 参数 |
|--------|------|----|
| speak  | 播放   | -- |
| cancel | 取消播放 | -- |

#### 插槽

| 名称      | 说明      | 
|---------|---------|
| default | 	替换icon |

### Empty 空内容

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpEmpty></VwpEmpty>
    <VwpEmpty :description="'没有数据'"></VwpEmpty>
    <VwpEmpty :is-icon="false" style="height: 120px;">
      <VwpButton type="primary" size="small">跳转首页</VwpButton>
    </VwpEmpty>
  </div>
</template>
```

:::

#### 属性

| 名称          | 说明     | 类型      | 可选值 | 默认值  |
|-------------|--------|---------|-----|------|
| isIcon      | 是否显示图标 | Boolean | --  | true |
| description | 描述     | String  | --  | 暂无数据 | 

#### 插槽

| 名称      | 说明    | 
|---------|-------|
| default | 	主体内容 |

### Chart 图表

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpButton @click="changeData(1)">切换数据1</VwpButton>
    <VwpButton @click="changeData(2)">切换数据2</VwpButton>
    <VwpButton @click="noData">没有数据</VwpButton>
    <VwpChart
        :options="options1"
        :emptyOptions="{description: '亲，没有数据哦！',}"
    ></VwpChart>
    <VwpChart :options="options2" :emptyOptions="{isIcon:false}">
      <template v-slot> 自定义空内容</template>
    </VwpChart>
  </div>
</template>
<script setup>
  import {ref} from "vue"

  const options1 = ref({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: [],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [],
      },
    ],
  })
  const options2 = ref({
    title: {
      text: "ECharts 入门示例2",
    },
    tooltip: {},
    xAxis: {
      data: [],
    },
    yAxis: {},
    series: [],
  })
  const changeData = function (type) {
    const xAxisData = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    options1.value.xAxis.data = xAxisData
    options2.value.xAxis.data = xAxisData

    if (type === 1) {
      options1.value.series[0].data = [5, 20, 36, 10, 10, 20]

      options2.value.series = [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: "退回",
          type: "bar",
          data: [1, 3, 2, 1, 1, 2],
        }
      ]
    } else {
      options1.value.series[0].data = [30, 40, 20, 34, 19, 28]

      options2.value.series = [
        {
          name: "销量",
          type: "bar",
          data: [34, 19, 28, 30, 40, 20,],
        },
        {
          name: "退回",
          type: "bar",
          data: [19, 28, 30, 40, 20, 34,],
        }
      ]
    }


  }
  const noData = function () {
    options1.value.series[0].data = [];
    options2.value.series = [];
  }
</script>
```

:::

#### 属性

| 名称           | 说明         | 类型     | 可选值 | 默认值   |
|--------------|------------|--------|-----|-------|
| options      | echarts 配置 | Object | --  | --    | 
| width        | 宽度         | String | --  | 100%  |
| height       | 高度度        | String | --  | 320px |
| emptyOptions | 空内容配置      | Object | --  | --    |

#### emptyOptions

| 参数          | 说明     | 类型      | 可选值 | 默认值  |
|-------------|--------|---------|-----|------|
| isIcon      | 是否显示图标 | Boolean | --  | true |
| description | 描述     | String  | --  | 暂无数据 |

#### 插槽

| 名称      | 说明   | 
|---------|------|
| default | 	空内容 |

### Sign 电子签名

#### 使用

::: demo

```vue

<template>
  <div>
    <VwpSign @save="signSave"></VwpSign>
  </div>
</template>
<script setup>
  const signSave = function (e) {
    console.log('save', e)
  }
</script>
```

:::

#### 属性

| 名称          | 说明       | 类型            | 可选值 | 默认值  |
|-------------|----------|---------------|-----|------|
| width       | 宽度       | String、Number | --  | --   |
| height      | 高度       | String、Number | --  | --   |
| showButtons | 是否显示操作按钮 | Boolean       | --  | true |
| options     | 配置       | Object        | --  | --   |

#### options

| 参数              | 说明     | 类型     | 可选值 | 默认值     |
|-----------------|--------|--------|-----|---------|
| strokeStyle     | 线条颜色   | String | --  | #000000 |
| minWidth        | 线条最小宽度 | Number | --  | 1.5     |
| maxWidth        | 线条最大宽度 | Number | --  | 4       |
| backgroundColor | 背景色    | String | --  | #ffffff |

##### 事件

| 名称         | 说明                  | 参数 |
|------------|---------------------|----|
| clear      | 清除                  | -- |
| undo       | 撤回                  | -- |
| getDataURL | canvas.toDataURL()值 | -- |

### ContextMenu 右键菜单

#### 使用

::: demo

```vue

<template>
  <div class="container">
    <div class="item item1">
      <vwp-context-menu
          :menus="menus"
          :extend="{ data: 1 }"
          @command="handleCommand"
          style="width: 100%; height: 100%"
      >
        <div>区域一</div>
      </vwp-context-menu>
    </div>
    <div class="item item2">
      <VwpContextMenu
          :menus="menus"
          :extend="{ data: 1 }"
          @command="handleCommand"
          style="width: 100%; height: 100%"
      >
        <div>区域二</div>
        <VwpContextMenu
            :menus="menus2"
            :extend="{ data: 2 }"
            @command="handleCommand"
            style="width: 200px; height: 200px"
        >
          <div class="box">区域三</div>
        </VwpContextMenu>
      </VwpContextMenu>
    </div>
    <div class="item item3">
      区域四，添加列表，在列表上右击
      <div class="todo">
        <div>
          <input v-model="todoName" type="text"/>
          <button @click="addTodo">添加</button>
        </div>
        <ul class="list">
          <template v-for="(item, index) in todoList" :key="index">
            <VwpContextMenu
                :menus="menus"
                :extend="{ data: item }"
                @command="handleCommand"
            >
              <li>{{ item }}</li>
              <template v-slot:menu="{ menu, data }">
                <div>{{ data }}：{{ menu.name }}</div>
              </template>
            </VwpContextMenu>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import ContextMenu from "../components/ContextMenu.vue";

  export default {
    mixins: [],
    props: {},
    data() {
      return {
        menus: [
          {
            name: "新增",
            label: "add",
            callback: this.addUser,
          },
          {
            name: "编辑",
            label: "edit",
            callback: this.editUser,
          },
          {
            name: "删除",
            label: "delete",
            callback: this.deleteUser,
          },
        ],
        menus2: [
          {
            name: "新增2",
            label: "add",
          },
          {
            name: "编辑2",
            label: "edit",
          },
          {
            name: "删除2",
            label: "delete",
          },
        ],
        todoName: "",
        todoList: [],
      };
    },
    mounted() {
    },
    methods: {
      addUser() {
        console.log("新增");
      },
      editUser() {
        console.log("编辑");
      },
      deleteUser() {
        console.log("删除");
      },
      handleCommand(menu) {
        console.log(menu);
      },
      addTodo() {
        this.todoList.push(this.todoName);
        this.todoName = "";
      },
    },
  };
</script>

<style scoped lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 300px 300px;
    column-gap: 20px;
    row-gap: 20px;
  }

  .item3 {
    //grid-row: 1 / 3; /* 合并占据 1到2 行，不包括3 */
    grid-column: 1 / 3; /* 合并占据 1到1 列，不包括2 */
  }

  .item1 {
    background-color: #ddd;
  }

  .item2 {
    background-color: skyblue;
  }

  .item3 {
    //background-color: yellow;
  }

  .item {
    border: 1px solid #ddd;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: yellow;
  }

  .todo li {
    line-height: 32px;
    border: 1px solid #ddd;
    width: 300px;
    //margin-bottom: 20px;
  }
</style>

```

:::

#### 属性

| 名称     | 说明           | 类型     | 可选值 | 默认值 |
|--------|--------------|--------|-----|-----|
| menus  | 菜单           | Array  | --  | --  |
| extend | 自定义扩展数据，类似标识 | Object | --  | --  |

#### menus

| 参数       | 说明   | 类型       | 可选值 | 默认值 |
|----------|------|----------|-----|-----|
| name     | 菜单名字 | String   | --  | --  |
| callback | 回调函数 | Function | --  | --  |
| disabled | 是否禁用 | Boolean  | --  | --  |

##### 事件

| 名称      | 说明         | 参数 |
|---------|------------|----|
| command | 点击菜单项触发的函数 | -- |

#### 插槽

| 名称      | 说明           | 
|---------|--------------|
| default | 	包裹触发右键菜单的内容 |

### Captcha 验证码

#### 使用

::: demo

```vue

<template>
  <div>
    <div>
      <VwpCaptcha type="ordinary" :options="{mode: 'alpha'}" @change="ok"/>
      <VwpCaptcha type="ordinary" :options="{mode: 'alpha-upper'}" @change="ok"/>
      <VwpCaptcha type="ordinary" :options="{mode: 'alpha-lower'}" @change="ok"/>
      <VwpCaptcha type="ordinary" :options="{mode: 'number'}" @change="ok"/>
      <VwpCaptcha type="ordinary" @change="ok"/>
    </div>
    <div>
      <VwpCaptcha type="slide" @change="ok" :options="{contentWidth:120, contentHeight: 32,}"/>
    </div>
    <div>
      <VwpCaptcha ref="captchaCalcRef" type="calc" @change="ok"/>
      <vwp-button @click="jy3">验证</vwp-button>
    </div>
  </div>
</template>
<script setup>
  const ok = function (e) {
    console.log('ok', e)
  }

  const captchaCalcRef = ref()
  const jy3 = function () {
    console.log('jy', captchaCalcRef.value)
    const res = captchaCalcRef.value.validate(5)
    console.log(res)
  }
</script>
```

:::

#### 属性

| 名称      | 说明      | 类型     | 可选值                 | 默认值      |
|---------|---------|--------|---------------------|----------|
| type    | 验证码类型   | String | ordinary、slide、calc | ordinary |
| options | 配置，参考如下 | Object | --                  | --       |

#### [type=ordinary] options

| 参数                 | 说明       | 类型      | 可选值                                        | 默认值   |
|--------------------|----------|---------|--------------------------------------------|-------|
| mode               | 验证码类型    | String  | alpha、alpha-upper、alpha-lower、number、mixed | mixed |
| codeNum            | 验证码数量    | Number  | --                                         | 4     |
| ignoreCase         | 忽略大小写    | Boolean | --                                         | false |
| contentWidth       | 内容宽度     | Number  | --                                         | 88    |
| contentHeight      | 内容高度     | Number  | --                                         | 32    |
| fontSizeMin        | 字体最小值    | Number  | --                                         | 18    |
| fontSizeMax        | 字体最大值    | Number  | --                                         | 40    |
| colorMin           | 颜色最小值    | Number  | 0-255                                      | 50    |
| colorMax           | 颜色最大值    | Number  | 0-255                                      | 160   |
| backgroundColorMin | 背景颜色最小值  | Number  | 0-255                                      | 180   |
| backgroundColorMax | 背景颜色最大值  | Number  | 0-255                                      | 240   |
| dotNum             | 干扰点数量    | Number  | --                                         | 30    |
| dotColorMin        | 干扰点颜色最小值 | Number  | 0-255                                      | 0     |
| dotColorMax        | 干扰点颜色最大值 | Number  | 0-255                                      | 255   |
| lineNum            | 干扰线数量    | Number  | --                                         | 6     |
| lineColorMin       | 干扰线颜色最小值 | Number  | 0-255                                      | 40    |
| lineColorMax       | 干扰线颜色最大值 | Number  | 0-255                                      | 180   |

#### [type=slide] options

| 参数            | 说明   | 类型            | 可选值 | 默认值 |
|---------------|------|---------------|-----|-----|
| contentWidth  | 内容宽度 | Number、String | --  | 160 |
| contentHeight | 内容高度 | Number、String | --  | 32  |

#### [type=calc] options

| 参数                 | 说明        | 类型            | 可选值      | 默认值 |
|--------------------|-----------|---------------|----------|-----|
| contentWidth       | 内容宽度      | Number、String | --       | 88  |
| contentHeight      | 内容高度      | Number、String | --       | 32  |
| min                | 最小数字      | Number        | --       | 1   |
| max                | 最大数字      | Number        | --       | 20  |
| operators          | 运算符(最多4种) | Array         | +、-、*、\/ | --  |
| colorMin           | 颜色最小值     | Number        | 0-255    | 40  |
| colorMax           | 颜色最大值     | Number        | 0-255    | 160 |
| backgroundColorMin | 背景颜色最小值   | Number        | 0-255    | 180 |
| backgroundColorMax | 背景颜色最大值   | Number        | 0-255    | 240 |
| dotNum             | 干扰点数量     | Number        | --       | 20  |
| lineNum            | 干扰线数量     | Number        | --       | 6   |

##### 事件

| 名称     | 说明       | 参数            |
|--------|----------|---------------|
| change | 当前状态变化触发 | （value:string |boolean） |

##### 方法

| 名称       | 说明    | 参数             |
|----------|-------|----------------|
| validate | 验证    | （value:string） |
| refresh  | 刷新    | --             |
| getCode  | 获取验证码 | --             |


