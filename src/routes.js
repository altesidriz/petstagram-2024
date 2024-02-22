 const router = require('express').Router();

//import homeControler
const homeControler = require('./controlers/homeControler');
const userControler = require('./controlers/userControler');

router.use(homeControler);
router.use('/users', userControler);

 module.exports = router;