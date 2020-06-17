
const {createLogger, format, transports} = require ('winston');
require ('winston-daily-rotate-file');

var logger = createLogger({
    format: format.simple(),
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new transports.DailyRotateFile({
            filename: `${__dirname}/./logs/access.log`,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
    exitOnError: false
});

module.exports = logger;
