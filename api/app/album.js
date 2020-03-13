const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const Album = require('../model/Album');

const config = require('../config');



const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.artist;

    if (req.query.artist){
        const item = await Album.find({executor: query}).populate('executor');

        return res.send(item);
    }

    const item = await Album.find().populate('executor');

    res.send(item);
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

module.exports = router;