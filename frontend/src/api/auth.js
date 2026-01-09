import axios from "axios";

const baseUrl = "/api";

export const login = async ({ email, password }) => {
  const response = await axios.post(`${baseUrl}/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async ({ email, password }) => {
  const response = await axios.post(`${baseUrl}/register`, {
    email,
    password,
  });
  return response.data;
};
