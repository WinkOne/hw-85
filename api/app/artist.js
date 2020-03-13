const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const Artist = require('../model/Artist');

const config = require('../config');



const router = express.Router();

router.get('/', async (req, res) => {
    const item = await Artist.find();
    res.send(item);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});


router.post('/', upload.single('imageArtist'), async (req, res) =>{
    const artistData = req.body;

    if(req.file) {
        artistData.imageArtist = req.file.filename;
    }

    const artist = new Artist(artistData);

    await artist.save();

    res.send(artist)
});

module.exports = router;