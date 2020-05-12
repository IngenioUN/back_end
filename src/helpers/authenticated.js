const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    //modificar retorno.
}

module.exports = helpers;