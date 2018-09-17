<template>
  <div id="app">
    <ToDoApp />
  </div>
</template>

<script>
import ToDoApp from "./components/ToDoApp";

export default {
  name: "app",
  components: {
    ToDoApp
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
