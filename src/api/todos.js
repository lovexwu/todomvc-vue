import axios from "axios";
import api from "./api";

const Todos = {
  list() {
    return axios.get(api.list);
  },
  add(data) {
    return axios.post(api.add, data);
  },
  update(data) {
    return axios.post(api.update, data);
  },
  remove(data) {
    return axios.post(api.remove, data);
  }
};

export default Todos;
