const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelper');


router.get('/create', (req, res) => {
    res.render('photos/create')
});

router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id
    };
    
    try {
        await photoManager.create(photoData);
        res.redirect('/photos');

    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
})

module.exports = router;