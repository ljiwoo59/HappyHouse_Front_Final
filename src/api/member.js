import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(params, success, fail) {
  await api.post(`/user/login`, JSON.stringify(params)).then(success).catch(fail);
}

// async function findById(userid, success, fail) {
//   // api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
//   await api.get(`/user/info/${userid}`).then(success).catch(fail);
// }

async function register(params, success, fail) {
  await api.post("/user/register", JSON.stringify(params)).then(success).catch(fail);
}

async function update(params, success, fail) {
  await api.put("/user/update", JSON.stringify(params)).then(success).catch(fail);
}

async function selectone(params, success, fail) {
  await api.get("/user/find" + params).then(success).catch(fail);
}

async function deleteone(params, success, fail) {
  await api.delete(`/user/delete/${params}`).then(success).catch(fail);
}
// function logout(success, fail)

export { login, register, update, selectone, deleteone };
