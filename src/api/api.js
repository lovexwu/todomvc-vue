// 本地serve
const host = "http://localhost:3000";

const api = {
  list: "/todos/list",
  add: "/todos/add",
  update: "/todos/update",
  remove: "/todos/delete"
};

Object.keys(api).forEach(key => {
  api[key] = host + api[key];
});

export default api;
