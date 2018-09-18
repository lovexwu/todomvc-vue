<template>
   <el-row>
    <el-col :span="4" v-show="todos.length>0">
      <el-checkbox
        :value="allCompleted"
        label="全选"
        border
        @change="toggleAll">
      </el-checkbox>
    </el-col>
    <el-col :span="16" :offset="todos.length==0?4:0">
      <el-input
        v-model.trim="newTodo"
        placeholder="What needs to be done?"
        autofocus
        @keyup.enter.native="addTodo">
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" icon="el-icon-plus" @click="addTodo">添加</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      newTodo: ""
    };
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["allCompleted"])
  },
  methods: {
    addTodo() {
      if (!this.newTodo) return;
      let name = this.newTodo;
      this.add(name);
      this.newTodo = "";
    },
    ...mapMutations(["toggleAll"]),
    ...mapActions(["add"])
  }
};
</script>
