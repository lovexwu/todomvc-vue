<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus
        v-model.trim="newTodo"
        @keyup.enter="add">
    </header>
    <section class="main" v-show="todos.length>0">
      <input id="toggle-all" class="toggle-all" type="checkbox"
        :checked="allCompleted"
        @click="toggelAll">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="(todo,index) in showTodos"
          :key="index"
          :class="{completed:todo.completed, editing:todo.editing}"
          class="todo"
          >
          <div class="view">
            <input class="toggle" type="checkbox"
              :checked="todo.completed"
              @click="toggle(todo)">
            <label @dblclick="edit(index)">{{todo.name}}</label>
            <button class="destroy" @click="remove(index)"></button>
          </div>
          <input class="edit"
            :value="todo.name"
            v-focus="todo.editing"
            @blur="doneEdit($event, todo, index)"
            @keyup.esc="cancelEdit(todo)"
            @keyup.enter="doneEdit($event, todo, index)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length>0">
      <span class="todo-count">
        <strong>{{actives}}</strong>
        {{actives === 1 ? 'item' : 'items'}} left
      </span>
      <ul class="filters">
        <li v-for="(type,index) in types" :key="index">
          <a
            :class="{selected:index===typeIndex}"
            @click="typeIndex=index">{{type}}</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import "todomvc-app-css/index.css";
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
      types: ["All", "Active", "Completed"],
      typeIndex: 0
    };
  },
  computed: {
    allCompleted() {
      return this.todos.every(todo => todo.completed);
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
    toggle(todo) {
      todo.completed = !todo.completed;
    },
    toggelAll() {
      let isAll = this.allCompleted;
      this.todos.forEach(todo => {
        todo.completed = !isAll;
      });
    },
    edit(index) {
      this.todos.forEach((todo, item) => {
        todo.editing = item === index;
      });
    },
    doneEdit(e, todo, index) {
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
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>

<style>
.todo-list li .toggle {
  left: 0;
}
.todo-list li label {
  text-align: left;
}
</style>
