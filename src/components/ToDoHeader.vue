<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus
      v-model.trim="newTodo"
      @keyup.enter="add">
  </header>
</template>

<script>
import mixins from "../mixin";
export default {
  mixins: [mixins],
  data() {
    return {
      newTodo: ""
    };
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
    }
  }
};
</script>
