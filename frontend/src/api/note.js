import axios from "axios";

export const getNotes = async ({ token, subjectId }) => {
  const res = await axios.get(`/api/notes?subjectId=${subjectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async ({ token, subjectId, title, content }) => {
  const res = await axios.post(
    "/api/notes",
    { subjectId, title, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
