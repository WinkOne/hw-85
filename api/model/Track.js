const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    titleTrack: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    number: {
      type: Number,
      required: true
    },
    duration: {
        type: String,
        required: true
    },
    public: false
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;