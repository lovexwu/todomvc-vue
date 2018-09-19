<template>
  <el-row v-show="todos.length>0" style="margin-top: 10px;">
    <el-col :span="4">
      <el-button size="small" disabled>
        {{actives}}
        {{actives === 1 ? 'item' : 'items'}} left
      </el-button>
    </el-col>
    <el-col :span="12" :offset="2">
      <el-button-group>
        <el-button
          v-for="(type,index) in types"
          :key="type.name"
          :icon="type.icon"
          size="small"
          :class="{selected:index===typeIndex}"
          @click="toLink(type.name, index)">
          {{type.name}}
        </el-button>
      </el-button-group>
    </el-col>
    <el-col :span="5" :offset="1" v-show="todos.length > actives">
      <el-button icon="el-icon-delete" size="small"  @click="clearCompleted">Clear completed</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      types: [
        {
          icon: "el-icon-menu",
          name: "All"
        },
        {
          icon: "el-icon-setting",
          name: "Active"
        },
        {
          icon: "el-icon-success",
          name: "Completed"
        }
      ],
      typeIndex: 0
    };
  },
  computed: {
    ...mapState(["todos"]),
    actives() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    toLink(name, index) {
      this.typeIndex = index;
      this.$router.push({ name });
    },
    ...mapActions(["clearCompleted"])
  }
};
</script>
