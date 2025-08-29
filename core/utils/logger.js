const { createLogger, format, transports, addColors } = require('winston');

const customLevels = {
  levels: {
    error: 0,
    step: 1,
    scenario: 2,
    info: 3,
  },
  colors: {
    error: 'red',
    step: 'green',
    scenario: 'yellow',
    info: 'blue',
  },
};

addColors(customLevels.colors);

const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [new transports.Console(), new transports.File({ filename: 'reports/logs/app.log' })],
});

module.exports = logger;
