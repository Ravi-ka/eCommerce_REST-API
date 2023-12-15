import fs from "fs";
import winston from "winston";

// const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = new Date().toString() + ". Log Data : " + logData;
//     await fsPromise.appendFile("logFile.txt", logData);
//   } catch (error) {
//     console.log(error);
//   }
// }

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logFile.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)} - ${
      req.method
    } - `;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
