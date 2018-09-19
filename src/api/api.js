// 本地serve
const host = "http://localhost:3000";

const api = {
  list: "/todos/list",
  add: "/todos/add",
  edit: "/todos/edit",
  remove: "/todos/delete",
  toggle: "/todos/toggle",
  toggleAll: "/todos/toggleAll",
  clearCompleted: "/todos/clearCompleted"
};

Object.keys(api).forEach(key => {
  api[key] = host + api[key];
});

export default api;
