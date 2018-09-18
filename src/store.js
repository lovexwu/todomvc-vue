import Vue from "vue";
import Vuex from "vuex";
import Todos from "./api/todos";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allCompleted: state => {
      return state.todos.every(todo => todo.completed);
    }
  },
  mutations: {
    initTodos(state, todos) {
      state.todos = todos;
    },
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
  },
  actions: {
    list({ commit }) {
      Todos.list().then(res => {
        let todos = res.data;
        todos.forEach(todo => {
          todo.completed = todo.completed === 1;
        });
        commit("initTodos", todos);
      });
    },
    add({ commit }, name) {
      Todos.add({ name, completed: 0 }).then(() => {
        commit("add", name);
      });
    },
    remove({ commit }, { id, index }) {
      Todos.remove({ id }).then(() => {
        commit("remove", index);
      });
    }
  }
});

export default store;
