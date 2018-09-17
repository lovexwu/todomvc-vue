const mixins = {
  props: {
    todos: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      todoList: this.todos
    };
  }
};

export default mixins;
