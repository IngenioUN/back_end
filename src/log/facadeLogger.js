const logger = require("./logger");


 const facadeLogger = {
    log: function(level, message) {
        logger.log(level, message.trim());
    },
    error: function(message) {
        logger.error(message.trim());
    },
    warn: function(message) {
        logger.warn(message.trim());
    },
    verbose: function(message) {
        logger.verbose(message.trim());
    },
    info: function(message) {
        logger.info(message.trim());
    },
    debug: function(message) {
        logger.debug(message.trim());
    },
    silly: function(message) {
        logger.silly(message.trim());
    }
};

module.exports = facadeLogger;
module.exports.stream = {
    write:
        message =>
        message.indexOf('status:5') >= 0 ? logger.error(message.trim() + error) : logger.debug(message.trim())
        //If status is greather than 0 it prints error level oyherwise it prints debug level log.
};
