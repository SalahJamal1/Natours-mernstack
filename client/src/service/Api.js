import axios from "axios";

const api = axios.create({
  baseURL: "https://natours-mernstack.vercel.app/api/v1/",
  withCredentials: "true",
});
export async function getTours() {
  const res = await api.get("tours");
  return res;
}
export async function getTourslug(slug) {
  const res = await api.get(`tours/tour/${slug}`);
  return res;
}
export async function Login(data) {
  const res = await api.post("users/login", data);
  console.log(res);
  return res;
}
export async function Logout() {
  const res = await api.get(`users/logout`);
  console.log(res);
  return res;
}
export async function Signup(data) {
  const res = await api.post(`users/signup`, data);
  console.log(res);
  return res;
}
export async function Getuser() {
  const res = await api.get(`users/me`);

  console.log(res);
  return res;
}
export async function forgetPassword(data) {
  const res = await api.post(`users/forgetpassword`, data);

  console.log(res);
  return res;
}
export async function resetpassword(id, data) {
  const res = await api.patch(`users/restpassword/${id}`, data);
  console.log(res);
  return res;
}
export async function updateMe(data) {
  const res = await api.patch(`users/updateMe`, data);

  console.log(res);
  return res;
}
export async function updateMyPassword(data) {
  const res = await api.patch(`users/updateMyPassword`, data);

  console.log(res);
  return res;
}
export async function booking(id) {
  const res = await api.get(`booking/checkout-session/${id}`);

  console.log(res);
  return res;
}
