import { createLogger, LoggerOptions, format, transports } from 'winston'

const loggerOptions: LoggerOptions = {

  level: "debug",
  format: format.combine(
    format.label({ label: process.env.SIGNOZ_SERVICE_NAME }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [new transports.Console()],
}

if(process.env.WINSTON_FILENAME && Array.isArray(loggerOptions.transports)) {

  loggerOptions.transports.push(
    new transports.File({
      level:      "info",
      filename:   process.env.WINSTON_FILENAME,
      maxsize:    Number.isNaN(process.env.WINSTON_MAXSIZE) ? 5000000 : parseInt(process.env.WINSTON_MAXSIZE!),
      maxFiles:   Number.isNaN(process.env.WINSTON_MAXFILES) ? 10 : parseInt(process.env.WINSTON_MAXFILES!),
      tailable:   true
    })
  )
}

const logger = createLogger(loggerOptions)

export default logger