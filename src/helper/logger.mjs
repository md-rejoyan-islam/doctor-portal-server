import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds}  [${label}] : ${message}`;
});

const syslogColors = {
  info: "bold magenta inverse",
  error: "bold red inverse",
};

export const logger = createLogger({
  level: "info",
  format: combine(
    label({
      label: "success",
    }),
    colorize({
      all: true,
      colors: syslogColors,
    }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "src/logs/success/success-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH-mm",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export const errorLogger = createLogger({
  level: "error",
  format: combine(
    label({
      label: "error",
    }),
    colorize({
      all: true,
      colors: syslogColors,
    }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "src/logs/error/error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH-mm",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
