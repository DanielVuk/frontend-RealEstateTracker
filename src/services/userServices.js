import axios from "axios";

const register = (email, password) => {
  return axios.post(process.env.REACT_APP_API_URL + "/users", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(process.env.REACT_APP_API_URL + "/users/login", {
    email,
    password,
  });
};

export { register, login };
