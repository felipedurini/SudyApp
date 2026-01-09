import axios from "axios";

export const aiAction = async ({ token, noteId, type }) => {
  const res = await axios.post(
    "/api/aiinteraction",
    { noteId, type },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { result }
};

export const getAIHistory = async ({ token, noteId }) => {
  const res = await axios.get(`/api/aiinteraction?noteId=${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // [{ id, type, response, ... }]
};
