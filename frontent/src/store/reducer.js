import {FETCH_ALBUM_SUCCESS, FETCH_ARTIST_SUCCESS, FETCH_NAME_ALBUM_SUCCESS, FETCH_TRACK_SUCCESS} from "./action";

const initialState ={
    artist: [],
    album: [],
    track: [],
    artistAlbum: []
};

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_ARTIST_SUCCESS){
        return {...state, artist: action.response}
    }
    if (action.type === FETCH_ALBUM_SUCCESS){
        return {...state, album: action.response}
    }
    if (action.type === FETCH_TRACK_SUCCESS){
        return {...state, track: action.response}
    }
    if (action.type === FETCH_NAME_ALBUM_SUCCESS){
        return {...state, artistAlbum: action.response}
    }

    return state;
};

export default reducer;