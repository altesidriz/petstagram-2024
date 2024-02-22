const jwt = require('../lib/jwt');
const {PRIVATE_KEY, TOKEN} = require('../config/config');


exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, PRIVATE_KEY);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.clearCookie(TOKEN);
            res.redirect('/users/login')
        }
    } else {
        next();
    }
}