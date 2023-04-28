import axios from "axios";

const register = (name, email, password) => {
  return axios.post(process.env.REACT_APP_API_URL + "/users", {
    name,
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

const getUser = async (token) => {
  return await axios.get(process.env.REACT_APP_API_URL + "/users/me", {
    headers: { "x-auth-token": token },
  });
};

export { register, login, getUser };
