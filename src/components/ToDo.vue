<template>
  <li
    :class="{completed:todo.completed, editing:todo.editing}"
    class="todo"
    >
    <div class="view">
      <input class="toggle" type="checkbox"
        :checked="todo.completed"
        @click="toggle(index)">
      <label @dblclick="edit(index)">{{todo.name}}</label>
      <button class="destroy" @click="remove(index)"></button>
    </div>
    <input class="edit"
      :value="todo.name"
      v-focus="todo.editing"
      @blur="doneEdit({name:$event.target.value, index})"
      @keyup.esc="cancelEdit(index)"
      @keyup.enter="doneEdit({name:$event.target.value, index})">
  </li>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    todo: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },
  methods: mapMutations(["remove", "toggle", "edit", "doneEdit", "cancelEdit"]),
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>
