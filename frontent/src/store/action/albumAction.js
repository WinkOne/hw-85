import {push} from "connected-react-router";
import axiosApi from "../../axios-api"
import {getArtist} from "./action";

export const createAlbum = data => {
    return async (dispatch) => {
        await axiosApi.post('/album', data);
        dispatch(push('/'));
        dispatch(getArtist());
    }
};