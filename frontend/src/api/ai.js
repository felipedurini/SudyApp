import axios from "axios";
import { API_BASE } from "./client";

export const aiAction = async ({ token, noteId, type }) => {
  const res = await axios.post(
    `${API_BASE}/api/aiinteraction`,
    { noteId, type },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getAIHistory = async ({ token, noteId }) => {
  const res = await axios.get(
    `${API_BASE}/api/aiinteraction?noteId=${noteId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
