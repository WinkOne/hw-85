const express = require('express');

const Track = require('../model/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.album;

    if (req.query.album) {
        const item = await Track.find({album: query});

        return res.send(item);
    }

    const item = await Track.find();

    res.send(item);
});


router.post('/', async (req, res) => {
    const trackData = req.body;

    const track = new Track(trackData);

    const numberTrack = await Track.find({album: req.body.album});

    track.number = numberTrack.length+1;

    console.log(track);

    await track.save();

    res.send(track)
});

module.exports = router;