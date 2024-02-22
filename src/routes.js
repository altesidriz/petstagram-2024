 const router = require('express').Router();

//import controlers(seperated routes as home, user etc.)

const homeControler = require('./controlers/homeControler');
const userControler = require('./controlers/userControler');

//give routes to main app(index.js)

router.use(homeControler);
router.use('/users', userControler);


 module.exports = router;