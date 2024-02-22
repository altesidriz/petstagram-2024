const jwt = require('../lib/jwt');
const {PRIVATE_KEY, TOKEN} = require('../config/config');


exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, PRIVATE_KEY);

            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (err) {
            res.clearCookie(TOKEN);
            res.redirect('/users/login')
        }
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('users/login')
    }
    next();
}