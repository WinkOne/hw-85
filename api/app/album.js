const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Album = require('../model/Album');

const config = require('../config');



const router = express.Router();
router.get('/', async (req, res) => {
    if(req.query.artist) {
        const album = await Album.find({executor: req.query.artist});
        res.send(album);
    } else {
        const item = await Album.find();
        res.send(item);
    }
});

router.get('/:id', async (req, res) => {
    const item = await Album.findOne({_id: req.params.id}).populate('executor');
    res.send(item);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});


router.post('/', upload.single('imageCover'), async (req, res) =>{
    const albumData = req.body;

    if(req.file) {
        albumData.imageCover = req.file.filename;
    }

    const album = new Album(albumData);

    await album.save();

    res.send(album)
});

router.post('/:id/public', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Album.findOne({_id: req.params.id});
        artist.published = req.body.publish;
        await artist.save();
        res.send(artist)
    } catch (e) {
        console.log(e)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Album.findByIdAndDelete({_id: req.params.id});
        console.log('Ok');
        return res.send({message: 'Only the author can delete'});
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;
