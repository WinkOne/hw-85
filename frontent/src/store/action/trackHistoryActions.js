import axiosApi from "../../axios-api";

export const GET_TRACK_HISTORY_REQUEST = 'GET_TRACK_HISTORY_REQUEST';
export const GET_TRACK_HISTORY_SUCCESS = 'GET_TRACK_HISTORY_SUCCESS';
export const GET_TRACK_HISTORY_FAILURE = 'GET_TRACK_HISTORY_FAILURE';

export const trackHistoryRequest = () => ({type: GET_TRACK_HISTORY_REQUEST});
export const trackHistorySuccess = response => ({type: GET_TRACK_HISTORY_SUCCESS, response});
export const trackHistoryFailure = error => ({type: GET_TRACK_HISTORY_FAILURE, error});

export const getTrackHistory = () => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(trackHistoryRequest());
        return axiosApi.get('/track_history', {headers: {'Authorization': 'Token ' + user.token}}).then(response => {
            dispatch(trackHistorySuccess(response.data));
            console.log(response.data);
        }, error => {
            dispatch(trackHistoryFailure(error));
        });
    }
};


export const trackHistoryPush = (id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
       await axiosApi.post('/track_history', {track: id}, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(trackHistorySuccess())
    }
};