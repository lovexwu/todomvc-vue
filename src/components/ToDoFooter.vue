<template>
  <footer class="footer" v-show="todoList.length>0">
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
import mixins from "../mixin";
import bus from "../bus";
export default {
  mixins: [mixins],
  data() {
    return {
      types: ["All", "Active", "Completed"]
    };
  },
  computed: {
    actives() {
      return this.todoList.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    clearCompleted() {
      this.todoList = this.todoList.filter(todo => !todo.completed);
      bus.$emit("clearCompleted", this.todoList);
    }
  }
};
</script>
