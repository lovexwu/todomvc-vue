<template>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header">
            <h1>todos</h1>
          </div>
          <el-row>
            <el-col :span="4" v-show="todos.length>0">
              <el-checkbox  v-model="allCompleted" label="全选" border></el-checkbox>
            </el-col>
            <el-col :span="16" :offset="todos.length==0?4:0">
              <el-input
                v-model.trim="newTodo"
                placeholder="What needs to be done?"
                autofocus
                @keyup.enter.native="add">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
            </el-col>
          </el-row>
          <el-table v-show="todos.length>0"
            :data="showTodos">
            <el-table-column width="80" align="left">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.completed"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <el-input
                  v-show="scope.row.editing"
                  v-model="scope.row.name"
                  size="small"
                  @blur="doneEdit(scope.row, scope.index)"
                  @keyup.enter.native="doneEdit(scope.row, scope.index)">
                </el-input>
                <span
                  v-show="!scope.row.editing"
                  :class="{completed:scope.row.completed}">
                  {{scope.row.name}}
                </span>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <el-button @click="edit(scope.$index)" type="text" size="small">编辑</el-button>
                <el-button @click="remove(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row v-show="todos.length>0" style="margin-top: 10px;">
            <el-col :span="4">
              <el-button size="small">
                {{actives}}
                {{actives === 1 ? 'item' : 'items'}} left
              </el-button>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-button-group>
                <el-button
                  v-for="(type,index) in types"
                  :key="type.name"
                  :icon="type.icon"
                  size="small"
                  :class="{selected:index===typeIndex}"
                  @click="typeIndex=index">
                  {{type.name}}
                </el-button>
              </el-button-group>
            </el-col>
            <el-col :span="5" :offset="1" v-show="todos.length > actives">
              <el-button icon="el-icon-delete" size="small"  @click="clearCompleted">Clear completed</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
      todos: [
        {
          name: "Taste JavaScript",
          completed: true,
          editing: false
        },
        {
          name: "Buy a unicorn",
          completed: false,
          editing: false
        }
      ],
      types: [
        {
          icon: "el-icon-menu",
          name: "All"
        },
        {
          icon: "el-icon-setting",
          name: "Active"
        },
        {
          icon: "el-icon-success",
          name: "Completed"
        }
      ],
      typeIndex: 0
    };
  },
  computed: {
    allCompleted: {
      get() {
        return this.todos.every(todo => todo.completed);
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    showTodos() {
      if (this.typeIndex === 2) {
        return this.todos.filter(todo => todo.completed);
      }
      if (this.typeIndex === 1) {
        return this.todos.filter(todo => !todo.completed);
      }
      return this.todos;
    },
    actives() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    add() {
      if (!this.newTodo) return;
      this.todos.push({
        name: this.newTodo,
        completed: false,
        editing: false
      });
      this.newTodo = "";
    },
    remove(index) {
      this.todos.splice(index, 1);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    edit(index) {
      this.todos.forEach((todo, item) => {
        todo.editing = item === index;
      });
    },
    doneEdit(todo, index) {
      if (!todo.name) {
        this.remove(index);
        return;
      }
      todo.editing = false;
    }
  }
};
</script>

<style>
.completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
.selected {
  background-color: #d8e8f8 !important;
}
.selected i,
.selected span {
  color: #409eff;
}
</style>
