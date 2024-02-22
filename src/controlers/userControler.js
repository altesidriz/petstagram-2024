const router = require('express').Router();
const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { TOKEN } = require('../config/config');


// ********** LOGIN CRUD OPERATIONS **********
router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);
    
        res.cookie(TOKEN, token);
    
        res.redirect('/');
        
    } catch (err) {
        res.render('users/login', {error: getErrorMessage(err)});
    }

});

// ********** REGISTER CRUD OPERATIONS **********
router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        await userManager.register({ username, email, password, rePassword });
        
        res.redirect('/users/login')

    } catch (err) {
        res.render('users/register', {error: getErrorMessage(err)});
    }
});

// ********** LOGOUT CRUD OPERATIONS **********
router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN);
    res.redirect('/');
})

module.exports = router;