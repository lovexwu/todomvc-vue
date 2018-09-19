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
    toggleAll({ todos }, allCompleted) {
      todos.forEach(todo => {
        todo.completed = allCompleted;
      });
    },
    edit({ todos }, index) {
      todos.forEach((todo, item) => {
        todo.editing = item === index;
      });
    },
    doneEdit({ todos }, { name, index }) {
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
          todo.editing = false;
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
    },
    toggle({ commit }, { todo, index }) {
      let id = todo.id;
      let completed = !todo.completed ? 1 : 0;
      Todos.toggle({ id, completed }).then(() => {
        commit("toggle", index);
      });
    },
    doneEdit({ commit }, { todo, index }) {
      let { name, id } = todo;
      if (todo.name) {
        Todos.edit({ name, id }).then(() => {
          commit("doneEdit", { name, index });
        });
      } else {
        Todos.remove({ id }).then(() => {
          commit("remove", index);
        });
      }
    },
    toggleAll({ commit, state }) {
      const allCompleted = state.todos.every(todo => todo.completed);
      let after = allCompleted ? 0 : 1;
      let before = allCompleted ? 1 : 0;
      Todos.toggleAll({ after, before }).then(() => {
        commit("toggleAll", !allCompleted);
      });
    },
    clearCompleted({ commit }) {
      Todos.clearCompleted().then(() => {
        commit("clearCompleted");
      });
    }
  }
});

export default store;
