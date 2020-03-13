const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    nameArtist: {
        type: String,
        required: true,
    },
    imageArtist: {
        type: String,
        required: true
    },
    infoArtist: {
        type: String,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;