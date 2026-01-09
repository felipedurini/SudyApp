import axios from "axios";
import { API_BASE } from "./client";

const baseUrl = `${API_BASE}/api/subjects`;

export const getSubjects = async (token) => {
  const res = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createSubject = async ({ token, name, description }) => {
  const res = await axios.post(
    baseUrl,
    { name, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
