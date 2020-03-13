const express = require('express');
const mongoose = require('mongoose');

const album = require('./app/album');
const artist = require('./app/artist');
const track = require('./app/track');
const users = require('./app/users');
const trackHistory = require('./app/trackHistory');

const config = require('./config');


const app = express();

app.use(express.json());
app.use(express.static('public'));



const run = async () => {
    await mongoose.connect('mongodb://localhost', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    app.use('/artist', album);
    app.use('/album', artist);
    app.use('/track', track);
    app.use('/users', users);
    app.use('/track_history', trackHistory);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`)
    })
};

run().catch(e => {
    console.error(e)
});