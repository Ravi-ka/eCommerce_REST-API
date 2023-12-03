import fs from "fs";

const fsPromise = fs.promises;

async function log(logData) {
  try {
    logData = new Date().toString() + ". Log Data : " + logData;
    await fsPromise.appendFile("logFile.txt", logData);
  } catch (error) {
    console.log(error);
  }
}

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)} - ${
      req.method
    }\n\n`;
    await log(logData);
  }
  next();
};

export default loggerMiddleware;
