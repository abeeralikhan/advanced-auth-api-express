require("dotenv").config();
import express from "express";
import connectDb from "./utils/connectDb";
import log from "./utils/logger";
import router from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/api", router);

app.listen(PORT, async () => {
  log.info(`Server is listening at http://localhost:${PORT}`);

  await connectDb();
});
