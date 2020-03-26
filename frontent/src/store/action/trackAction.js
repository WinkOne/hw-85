import {push} from "connected-react-router";
import axiosApi from "../../axios-api"
import {getArtist} from "./action";

export const createTrack = data => {
    return async (dispatch) => {
        await axiosApi.post('/track', data);
        dispatch(push('/'));
        dispatch(getArtist());
    }
};