const express = require('express');
const auth = require('../middleware/auth');

const TrackHistory = require('../model/TrackHistory');

const User = require('../model/User');

const router = express.Router();

router.get('/', async (req, res) => {
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

    const item = await TrackHistory.find({user: user._id}).populate({
        path : 'track',
        populate : {
            path : 'album', populate: {
                path: 'executor'
            }
        }
    });
    console.log(item);

    res.send(item);




});


router.post('/', async (req, res) => {
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

    return res.send(trackHistory);


});

module.exports = router;