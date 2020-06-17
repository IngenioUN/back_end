
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
            filename: `${__dirname}/./log/access.log`,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
    exitOnError: false
});

/*
 logger.stream = {
    log: function(level, message) {
        logger.log(level, formatMessage(message));
    },
    error: function(message) {
        logger.error(formatMessage(message));
    },
    warn: function(message) {
        logger.warn(formatMessage(message));
    },
    verbose: function(message) {
        logger.verbose(formatMessage(message));
    },
    info: function(message) {
        logger.info(formatMessage(message));
    },
    debug: function(message) {
        logger.debug(formatMessage(message));
    },
    silly: function(message) {
        logger.silly(formatMessage(message));
    }
}; */

module.exports = logger;
module.exports.stream = {
    write:
        message => message.indexOf('status:5') >= 0 ? logger.error(message.trim() + error) : logger.info(message.trim())
};
