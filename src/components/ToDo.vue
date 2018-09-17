<template>
  <li
    :class="{completed:todo.completed, editing:todo.editing}"
    class="todo"
    >
    <div class="view">
      <input class="toggle" type="checkbox"
        :checked="todo.completed"
        @click="$emit('toggle', todo)">
      <label @dblclick="$emit('edit', index)">{{todo.name}}</label>
      <button class="destroy" @click="$emit('remove', index)"></button>
    </div>
    <input class="edit"
      :value="todo.name"
      v-focus="todo.editing"
      @blur="doneEdit($event, todo, index)"
      @keyup.esc="$emit('cancelEdit', todo)"
      @keyup.enter="doneEdit($event, todo, index)">
  </li>
</template>

<script>
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
  methods: {
    doneEdit(e, todo, index) {
      this.$emit("doneEdit", { e, todo, index });
    }
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>
