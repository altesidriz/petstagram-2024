const router = require('express').Router();
const userManager = require('../managers/userManager');


// ********** LOGIN CRUD OPERATIONS **********
router.get('/login', (req, res)=> {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const token = await userManager.login(username, password);

    res.cookie('access_token', token);

    res.redirect('/');
});

// ********** REGISTER CRUD OPERATIONS **********
router.get('/register', (req, res)=> {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const {username, email, password, rePassword} = req.body;

    await userManager.register({username, email, password, rePassword});

    res.redirect('/users/login')
});

// ********** LOGOUT CRUD OPERATIONS **********
router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/');
})

module.exports = router;