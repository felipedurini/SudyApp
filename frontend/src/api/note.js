import axios from "axios";
import { API_BASE } from "./client";

const baseUrl = `${API_BASE}/api/notes`;

export const getNotes = async ({ token, subjectId }) => {
  const res = await axios.get(`${baseUrl}?subjectId=${subjectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async ({ token, subjectId, title, content }) => {
  const res = await axios.post(
    baseUrl,
    { subjectId, title, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
