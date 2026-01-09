import axios from "axios";

export const getSubjects = async (token) => {
  const res = await axios.get("/api/subjects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createSubject = async ({ token, name, description }) => {
  const res = await axios.post(
    "/api/subjects",
    { name, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};