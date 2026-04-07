import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  }
})

// yha se headers mai token bhej rahe hai jo sbb log access kre hai
api.interceptors.request.use((config) => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const auth = JSON.parse(JSON.parse(persistRoot).auth);
    const token = auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api