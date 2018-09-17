<template>
  <section class="todoapp">
    <ToDoHeader/>
    <router-view></router-view>
    <ToDoFooter/>
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
