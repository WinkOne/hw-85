const express = require('express');
const TrackHistory = require('../model/TrackHistory');

const User = require('../model/User');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const query = req.query.album;
//
//     if (req.query.album) {
//         const item = await Artist.find({album: query});
//
//         return res.send(item);
//     }
//
//     const item = await Artist.find();
//
//     res.send(item);
// });


router.post('/', async (req, res) => {
    console.log(req.body);
    const authorizationHeader = req.get('Authorization');

    if(!authorizationHeader){
        return res.status(401).send({error: 'Not authorization'});
    }

    const [type, token] = authorizationHeader.split(' ');

    if(type !== "Token" || !token){
        return res.status(401).send({error: 'Not authorization'})
    }

    const user = await User.findOne({token});

    if(!user){
        return res.status(401).send({error: 'Not authorization'})
    }

    const trackHistory = await TrackHistory.create({user: user._id, track: req.body.track});

    console.log(trackHistory);

    return res.send(trackHistory);


});

module.exports = router;