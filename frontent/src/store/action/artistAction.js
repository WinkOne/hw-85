import {push} from "connected-react-router";
import axiosApi from "../../axios-api"
import {getArtist, getPublishedArtist} from "./action";

export const DELETE_ARTIST = 'DELETE_ARTIST';

export const deleteArtist = () => {return {type: DELETE_ARTIST}};

export const createArtist = data => {
    return async (dispatch) => {
        await axiosApi.post('/artist', data);
        dispatch(push('/public'));
        dispatch(getArtist());
    }
};

export const publicArtist = (id, data) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.post('/artist/' + id + '/public', data, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getPublishedArtist());
    }
};


export const deleteArtistGet = (id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.delete('/artist/' + id, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(deleteArtist());
        dispatch(getPublishedArtist());
    }
};