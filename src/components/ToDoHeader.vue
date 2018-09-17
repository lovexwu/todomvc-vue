<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus
      v-model.trim="newTodo"
      @keyup.enter="addTodo">
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      newTodo: ""
    };
  },
  methods: {
    addTodo() {
      if (!this.newTodo) return;
      let name = this.newTodo;
      this.add(name);
      this.newTodo = "";
    },
    ...mapMutations(["add"])
  }
};
</script>
