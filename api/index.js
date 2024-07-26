const express = require("express");
const database = require("../config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../routes/route");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = 3002 || process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://akatsuki-shadcn-frontend.vercel.app",
      "https://akatsuki-shadcn-frontend.vercel.app/#",
      "https://akatsuki-connect.vercel.app",
    ],
    credentials: true,
  })
);

database.connect();

app.use("/", routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: `Server is Running on PORT ${PORT}🎉`,
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
