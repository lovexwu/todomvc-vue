<template>
  <section class="main" v-show="todos.length>0">
    <input id="toggle-all" class="toggle-all" type="checkbox"
      :checked="allCompleted"
      @click="toggleAll">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <to-do
        v-for="(todo,index) in showTodos"
        :key="index"
        :todo="todo"
        :index="index" />
    </ul>
  </section>
</template>

<script>
import ToDo from "../components/ToDo";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    ToDo
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["allCompleted"]),
    showTodos() {
      let name = this.$route.name;
      if (name === "Completed") {
        return this.todos.filter(todo => todo.completed);
      }
      if (name === "Active") {
        return this.todos.filter(todo => !todo.completed);
      }
      return this.todos;
    }
  },
  methods: mapMutations(["toggleAll"])
};
</script>
