<template>
  <section class="main" v-show="todoList.length>0">
    <input id="toggle-all" class="toggle-all" type="checkbox"
      v-model="allCompleted">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <to-do
        v-for="(todo,index) in showTodos"
        :key="index"
        :todo="todo"
        :index="index"
        @remove="remove"
        @toggle="toggle"
        @edit="edit"
        @doneEdit="doneEdit"
        @cancelEdit="cancelEdit"/>
    </ul>
  </section>
</template>

<script>
import bus from "../bus";
import ToDo from "../components/ToDo";
export default {
  components: {
    ToDo
  },
  data() {
    return {
      todoList: this.$parent.todos
    };
  },
  computed: {
    showTodos() {
      let name = this.$route.name;
      if (name === "Completed") {
        return this.todoList.filter(todo => todo.completed);
      }
      if (name === "Active") {
        return this.todoList.filter(todo => !todo.completed);
      }
      return this.todoList;
    },
    allCompleted: {
      get() {
        return this.todoList.every(todo => todo.completed);
      },
      set(value) {
        this.todoList.forEach(todo => {
          todo.completed = value;
        });
      }
    }
  },
  created() {
    bus.$on("clearCompleted", newTodos => {
      this.todoList = newTodos;
    });
  },
  methods: {
    remove(index) {
      this.todoList.splice(index, 1);
    },
    toggle(todo) {
      todo.completed = !todo.completed;
    },
    edit(index) {
      this.todoList.forEach((todo, item) => {
        todo.editing = item === index;
      });
    },
    doneEdit({ e, todo, index }) {
      let name = e.target.value;
      if (!name) {
        this.remove(index);
        return;
      }
      todo.name = e.target.value;
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.editing = false;
    }
  }
};
</script>
