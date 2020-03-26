const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Artist = require('../model/Artist');

const config = require('../config');


const router = express.Router();

router.get('/', async (req, res) => {
    const item = await Artist.find({published: false});
    res.send(item);
});
router.get('/published', async (req, res) => {
    const item = await Artist.find({published: true});
    res.send(item);
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});


router.post('/', upload.single('imageArtist'), async (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.imageArtist = req.file.filename;
    }

    const artist = new Artist(artistData);

    await artist.save();

    res.send(artist)
});

router.post('/:id/public', [auth, permit('admin')], async (req, res) => {
    const artistData = req.body;

    artistData.imageArtist = req.body.imageArtist;

    artistData.published = true;

    const artist = Artist(artistData);

    await artist.save();

    res.send(artist)
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Artist.findByIdAndDelete({_id: req.params.id});
        console.log('Ok');
        return res.send({message: 'Only the author can delete'});
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;