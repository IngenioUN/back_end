
const {createLogger, format, transports} = require ('winston');


var consoleLogger = createLogger({
    format: format.simple(),
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = consoleLogger;


