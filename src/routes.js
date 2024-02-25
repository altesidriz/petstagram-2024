 const router = require('express').Router();

//import controlers(seperated routes as home, user etc.)

const homeControler = require('./controlers/homeControler');
const userControler = require('./controlers/userControler');
const photoControler = require('./controlers/photoControler');

//give routes to main app(index.js)

router.use(homeControler);
router.use('/users', userControler);
router.use('/photos', photoControler);
router.get('*', (req, res)=>{
    res.redirect('404');
})


 module.exports = router;