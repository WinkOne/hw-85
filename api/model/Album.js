const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    titleAlbum: {
        type: String,
        required: true,
    },
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    yearOfIssueAlbum: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    imageCover: {
        type: String,
    },
    published : {
        type: Boolean,
        enum: [true, false],
        default: false,
        required: true
    }
});

const Album = mongoose.model( 'Album', AlbumSchema);

module.exports = Album;