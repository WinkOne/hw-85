import axiosApi from "../../axios-api";


export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_ERROR = 'FETCH_ARTIST_ERROR';

export const fetchArtistRequest = () => {
    return {type: FETCH_ARTIST_REQUEST}
};

export const fetchArtistSuccess = (response) => {
    return {type: FETCH_ARTIST_SUCCESS, response}
};

export const fetchArtistError = () => {
    return {type: FETCH_ARTIST_ERROR}
};

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR';

export const fetchAlbumRequest = () => {
    return {type: FETCH_ALBUM_REQUEST}
};

export const fetchAlbumSuccess = (response) => {
    return {type: FETCH_ALBUM_SUCCESS, response}
};

export const fetchAlbumError = () => {
    return {type: FETCH_ALBUM_ERROR}
};

export const FETCH_TRACK_REQUEST = 'FETCH_TRACK_REQUEST';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_ERROR = 'FETCH_TRACK_ERROR';

export const fetchTrackRequest = () => {
    return {type: FETCH_TRACK_REQUEST}
};

export const fetchTrackSuccess = (response) => {
    return {type: FETCH_TRACK_SUCCESS, response}
};

export const fetchTrackError = () => {
    return {type: FETCH_TRACK_ERROR}
};

export const FETCH_NAME_ALBUM_REQUEST = 'FETCH_NAME_ALBUM_REQUEST';
export const FETCH_NAME_ALBUM_SUCCESS = 'FETCH_NAME_ALBUM_SUCCESS';
export const FETCH_NAME_ALBUM_ERROR = 'FETCH_NAME_ALBUM_ERROR';

export const fetchNameAlbumRequest = () => {
    return {type: FETCH_NAME_ALBUM_REQUEST}
};

export const fetchNameAlbumSuccess = (response) => {
    return {type: FETCH_NAME_ALBUM_SUCCESS, response}
};

export const fetchNameAlbumError = () => {
    return {type: FETCH_NAME_ALBUM_ERROR}
};

export const getTrack = (id) => {
    return dispatch => {
        dispatch(fetchTrackRequest());
        return axiosApi.get('/track?album=' + id).then(response => {
            dispatch(fetchTrackSuccess(response.data));
        }, error => {
            dispatch(fetchTrackError(error));
        });
    }
};
export const getNameAlbum = (id) => {
    return dispatch => {
        dispatch(fetchNameAlbumRequest());
        axiosApi.get('/album/' + id).then(response => {
            dispatch(fetchNameAlbumSuccess(response.data));
        }, error => {
            dispatch(fetchNameAlbumError(error));
        });
    }
};

export const getAlbum = (id) => {
    return dispatch => {
        dispatch(fetchAlbumRequest());
        axiosApi.get('/album?artist=' + id).then(response => {
            dispatch(fetchAlbumSuccess(response.data));
        }, error => {
            dispatch(fetchAlbumError(error));
        });
    }
};


export const getArtist = () => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(fetchArtistRequest());
        if (!user) {
            axiosApi.get('/artist', {headers: {'Authorization': 'anonim'}}).then(response => {
                dispatch(fetchArtistSuccess(response.data));
            }, error => {
                dispatch(fetchArtistError(error));
            });
        } else {
            axiosApi.get('/artist', {headers: {'Authorization': 'Token ' + user.token}}).then(response => {
                dispatch(fetchArtistSuccess(response.data));
            }, error => {
                dispatch(fetchArtistError(error));
            });
        }
    }
};



