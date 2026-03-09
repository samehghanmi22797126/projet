// server.js
const dotenv = require("dotenv");
dotenv.config(); // doit être appelé en premier

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT}`);
});
