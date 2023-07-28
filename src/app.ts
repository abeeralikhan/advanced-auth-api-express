require("dotenv").config();
import express from "express";
import connectDb from "./utils/connectDb";
import log from "./utils/logger";

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => res.send({ message: "Hola Amigo!" }));

app.listen(PORT, async () => {
  log.info(`Server is listening at http://localhost:${PORT}`);

  await connectDb();
});
