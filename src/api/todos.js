import axios from "axios";
import api from "./api";

const Todos = {
  list() {
    return axios.get(api.list);
  },
  add(data) {
    return axios.post(api.add, data);
  },
  edit(data) {
    return axios.post(api.edit, data);
  },
  remove(data) {
    return axios.post(api.remove, data);
  },
  toggle(data) {
    return axios.post(api.toggle, data);
  },
  toggleAll(data) {
    return axios.post(api.toggleAll, data);
  },
  clearCompleted() {
    return axios.post(api.clearCompleted);
  }
};

export default Todos;
