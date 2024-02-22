const router = require('express').Router();

const { Router } = require('express');
const userManager = require('../managers/userManager');


// ********** LOGIN CRUD OPERATIONS **********
router.get('/login', (req, res)=> {
    res.render('users/login')
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    await userManager.login(username, password);

    res.send('Loged in')
});

// ********** REGISTER CRUD OPERATIONS **********
router.get('/register', (req, res)=> {
    res.render('users/register')
});

router.post('/register', async (req, res) => {
    const {username, email, password, rePassword} = req.body;

    await userManager.register({username, email, password, rePassword});

    res.send('User has registered')
});

// ********** LOGOUT CRUD OPERATIONS **********


module.exports = router;