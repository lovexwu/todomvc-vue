import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
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
    ]
  },
  getters: {
    allCompleted: state => {
      return state.todos.every(todo => todo.completed);
    }
  },
  mutations: {
    add({ todos }, name) {
      todos.push({
        name,
        completed: false,
        editing: false
      });
    },
    remove({ todos }, index) {
      todos.splice(index, 1);
    },
    toggle({ todos }, index) {
      todos[index].completed = !todos[index].completed;
    },
    toggleAll({ todos }) {
      const allCompleted = todos.every(todo => todo.completed);
      todos.forEach(todo => {
        todo.completed = !allCompleted;
      });
    },
    edit({ todos }, index) {
      todos.forEach((todo, item) => {
        todo.editing = item === index;
      });
    },
    doneEdit({ todos }, { name, index }) {
      if (!name) {
        todos.splice(index, 1);
        return;
      }
      todos[index].name = name;
      todos[index].editing = false;
    },
    cancelEdit({ todos }, index) {
      todos[index].editing = false;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  }
});

export default store;
