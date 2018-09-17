<template>
  <section class="todoapp">
    <ToDoHeader :todos="todos"/>
    <router-view></router-view>
    <ToDoFooter :todos="todos"/>
  </section>
</template>

<script>
import "todomvc-app-css/index.css";
import ToDoHeader from "./ToDoHeader";
import ToDoFooter from "./ToDoFooter";
export default {
  components: {
    ToDoHeader,
    ToDoFooter
  },
  data() {
    return {
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
    };
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
