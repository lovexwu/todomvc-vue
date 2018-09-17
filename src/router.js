import Vue from "vue";
import Router from "vue-router";
import ToDoMain from "./views/ToDoMain";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "All"
    },
    {
      path: "/all",
      name: "All",
      component: ToDoMain
    },
    {
      path: "/active",
      name: "Active",
      component: ToDoMain
    },
    {
      path: "/completed",
      name: "Completed",
      component: ToDoMain
    }
  ]
});

export default router;
