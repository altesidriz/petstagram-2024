const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelper');


router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();
    res.render('photos', { photos });
});

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
});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).lean();

    const isOwner = req.user?._id === photo.owner._id.toString(); //or .toString() coz it returns new ObjectId


    res.render('photos/details', { photo, isOwner })
})

router.get('/:photoId/delete', async (req, res) => {
    const photoId = req.params.photoId;
    try {
        await photoManager.delete(photoId);
        res.redirect('/photos');
    } catch (error) {
        res.render('photos/details', { error: 'Unsuccessfull operation!' })
    }
});

router.get('/:photoId/edit', async (req, res) => {

    const photo = await photoManager.getOne(req.params.photoId).lean();
    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', async (req, res) => {
    const photoData = req.body;
    const photoId = req.params.photoId;
    try {
        await photoManager.edit(photoId, photoData);

        res.redirect(`/photos/${photoId}/details`);

    } catch (error) {

        res.render('photos/edit', { error: 'Unable to update photo', ...photoData })
    }
});


module.exports = router;