<template>
  <footer class="footer" v-show="todos.length>0">
    <span class="todo-count">
      <strong>{{actives}}</strong>
      {{actives === 1 ? 'item' : 'items'}} left
    </span>
    <ul class="filters">
      <li v-for="(type,index) in types" :key="index">
        <router-link 
          :to="{name: type}"
          active-class="selected">{{type}}</router-link>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted">Clear completed</button>
  </footer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      types: ["All", "Active", "Completed"]
    };
  },
  computed: {
    ...mapState(["todos"]),
    actives() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: mapMutations(["clearCompleted"])
};
</script>
