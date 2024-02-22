const { getErrorMessage } = require('../utils/errorHelper')
exports.errorHandler = (err, req, res, next) => {
    
    res.render('/404', { error: getErrorMessage(err) });
}