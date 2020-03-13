const express = require('express');

const Artist = require('../model/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.album;

    if (req.query.album) {
        const item = await Artist.find({album: query});

        return res.send(item);
    }

    const item = await Artist.find();

    res.send(item);
});


router.post('/', async (req, res) => {
    const trackData = req.body;

    const track = new Artist(trackData);

    await track.save();

    res.send(track)
});

module.exports = router;