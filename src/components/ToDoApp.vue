<template>
  <el-row>
    <el-col >
      <el-card>
        <div slot="header">
          <h1>todos</h1>
        </div>
        <ToDoHeader/> 
        <router-view></router-view>
        <ToDoFooter/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ToDoHeader from "./ToDoHeader";
import ToDoFooter from "./ToDoFooter";
import { mapActions } from "vuex";
export default {
  components: {
    ToDoHeader,
    ToDoFooter
  },
  created() {
    this.list();
  },
  methods: mapActions(["list"])
};
</script>

<style>
.completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
.selected {
  background-color: #d8e8f8 !important;
}
.selected i,
.selected span {
  color: #409eff;
}
</style>
