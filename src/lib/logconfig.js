const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format


const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
})

const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: '../log/error.log', level: 'error' }),
    new transports.File({ filename: '../log/debug.log', level: 'debug' }),
    new transports.File({ filename: '../log/combined.log' }),
  ],
})


module.exports = logger
