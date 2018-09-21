import Vue from "vue";
import Vuex from "vuex";
import AV from "leancloud-storage";

AV.init({
  appId: "maMd3SMW377AXQtKAkBCS3WU-gzGzoHsz",
  appKey: "QppscR1Rt2sEyiL4J7DnCKaT"
});

const query = new AV.Query("Todos");
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
    add({ todos }, { name, id }) {
      todos.push({
        name,
        completed: false,
        editing: false,
        id
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
      query.find().then(res => {
        let todos = [];
        res.forEach(item => {
          let { name, completed } = item.attributes;
          todos.push({
            name,
            completed,
            id: item.id,
            editing: false
          });
        });
        commit("initTodos", todos);
      });
    },
    add({ commit }, name) {
      // 这里注意每次操作都要重新获取object，不然删除操作后的任何操作都会出错
      const object = new AV.Object("Todos");
      object.save({ name, completed: false }).then(res => {
        commit("add", { name, id: res.id });
      });
    },
    remove({ commit }, { id, index }) {
      const todo = AV.Object.createWithoutData("Todos", id);
      todo.destroy().then(() => {
        commit("remove", index);
      });
    },
    toggle({ commit }, { todo, index }) {
      const instance = AV.Object.createWithoutData("Todos", todo.id);
      instance.set("completed", !todo.completed);
      instance.save().then(() => {
        commit("toggle", index);
      });
    },
    doneEdit({ commit }, { todo, index }) {
      let { name, id } = todo;
      const instance = AV.Object.createWithoutData("Todos", id);
      if (todo.name) {
        instance.set("name", name);
        instance.save().then(() => {
          commit("doneEdit", { name, index });
        });
      } else {
        instance.destroy().then(() => {
          commit("remove", index);
        });
      }
    },
    toggleAll({ commit, state }) {
      const allCompleted = state.todos.every(todo => todo.completed);
      query.equalTo("completed", allCompleted);
      query
        .find()
        .then(todos => {
          todos.forEach(todo => {
            todo.set("completed", !allCompleted);
          });
          return AV.Object.saveAll(todos);
        })
        .then(() => {
          commit("toggleAll", !allCompleted);
        });
    },
    clearCompleted({ commit }) {
      query.equalTo("completed", true);
      query
        .find()
        .then(todos => {
          return AV.Object.destroyAll(todos);
        })
        .then(() => {
          commit("clearCompleted");
        });
    }
  }
});

export default store;
