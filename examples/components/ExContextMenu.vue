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
