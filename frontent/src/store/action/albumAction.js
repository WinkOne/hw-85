import {push} from "connected-react-router";
import axiosApi from "../../axios-api"
import {getArtist} from "./action";
import {deleteArtist} from "./artistAction";

export const createAlbum = data => {
    return async (dispatch) => {
        await axiosApi.post('/album', data);
        dispatch(push('/'));
        dispatch(getArtist());
    }
};

export const publicAlbum = (id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.post('/album/' + id + '/public', {publish: true}, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getArtist());
    }
};

export const deleteAlbumGet = (id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.delete('/album/' + id, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(deleteArtist());
        dispatch(getArtist());
    }
};
