const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {

   const user = new User(req.body);
    console.log(user);

    try {
       user.generateToken();

       await user.save();

       return res.send(user);

   } catch (error) {

       return res.status(400).send(error);

   }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if(!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isMatch){
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    res.send({token: user.token});
});

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

    console.log(authorizationHeader);

    return res.send({message: 'You have access to this endpoint, Welcome ' + user.username + '!' });
});

module.exports = router;