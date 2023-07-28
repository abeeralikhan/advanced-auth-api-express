import dayjs from "dayjs";
import logger from "pino";

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level: LOG_LEVEL,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
