require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Falta MONGODB_URI en .env");
}

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Mongo conectado");
    app.listen(PORT, () => {
      console.log(`Server en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error conectando a Mongo:", err.message);
    process.exit(1);
  });
