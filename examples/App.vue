<script setup lang="ts">
import {ref} from 'vue'
import ExContextMenu from "./components/ExContextMenu.vue";
import Floor from "./components/Floor.vue";
// import useDataView from "./hooks/useDataView"
//
// useDataView()

const showDialog = ref(false);

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
  {key: 'index', title: '序号', width: '120px'},
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


const message = ref('欢迎使用语音播报功能');


const options1 = ref<any>({
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
const options2 = ref<any>({
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

const signSave = function (e) {
  console.log('save', e)
}

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

<template>

  <div>
    <h3>Icon</h3>
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
  <div>
    <h3>Button</h3>
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
      <VwpButton circle icon="close">1</VwpButton>
      <VwpButton type="primary" circle icon="close"></VwpButton>
      <VwpButton type="success" circle icon="close"></VwpButton>
      <VwpButton type="warning" circle icon="close"></VwpButton>
      <VwpButton type="danger" circle icon="close"></VwpButton>
      <VwpButton type="info" circle icon="close"></VwpButton>
    </div>
    <div>
      <VwpButton type="primary" icon="close">
        关闭
      </VwpButton>
      <VwpButton type="primary">
        <VwpIcon name="close"/>
        关闭
      </VwpButton>
      <VwpButton type="primary"> 关闭
        <VwpIcon name="close"/>
      </VwpButton>
    </div>
    <h3>ButtonGroup</h3>
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
  </div>
  <div>
    <h3>Link</h3>
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
  <div>
    <h3>Input</h3>
    <VwpInput></VwpInput>
  </div>
  <div>
    <h3>Dialog</h3>
    <VwpButton type="primary" @click="showDialog = !showDialog">打开</VwpButton>
    <VwpDialog v-model="showDialog">
      这是body内容
    </VwpDialog>
  </div>
  <Floor>
    <VwpScrollTable :data="tableData"
                    :columns="cols"
                    :showHeader="true"
                    height="100%"
                    :headerHeight="40"
                    :rowsPerPage="4"
                    :interval="3000"
                    :autoStart="false"
                    :isPagerBtn="true"
                    emptyText="没有数据"
                    @row-click="handleRowClick"
                    :rowClassName="handleRowClassName"
                    headerRowClassName="header--style">
      <template #header-account>
        <vwp-button type="success" size="small">账号</vwp-button>
      </template>
      <template #index="{ index }">
        {{index}}
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
  </Floor>
  <div>
    <h3>语言播报</h3>
    <VwpInput v-model="message"></VwpInput>
    <VwpSpeech :message="message"></VwpSpeech>
  </div>
  <div>
    <h3>Empty</h3>
    <VwpEmpty></VwpEmpty>
    <VwpEmpty :description="'没有数据'"></VwpEmpty>
    <VwpEmpty :is-icon="false" style="height: 120px;">
      <VwpButton type="primary" size="small">跳转首页</VwpButton>
    </VwpEmpty>
  </div>
  <div>
    <h3>Chart</h3>
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
  <div>
    <h3>Sign</h3>
    <VwpSign @save="signSave"></VwpSign>
  </div>
  <div>
    <h3>ContextMenu</h3>
    <ExContextMenu></ExContextMenu>
  </div>
  <div>
    <h3>Captcha</h3>
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

<style scoped>

</style>
