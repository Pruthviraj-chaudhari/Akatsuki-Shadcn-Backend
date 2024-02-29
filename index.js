import express, { json } from "express";
import { connect } from "./config/database";
import cors from "cors";
import { json as _json } from "body-parser";
import routes from "./routes/route";
import cookieParser from "cookie-parser";

const PORT = 3002 || process.env.PORT;

const app = express();

app.use(json());
app.use(_json());
app.use(cookieParser());
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

connect();

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
