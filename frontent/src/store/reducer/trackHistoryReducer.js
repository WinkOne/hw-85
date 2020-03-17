import {GET_TRACK_HISTORY_SUCCESS} from "../action/trackHistoryActions";

const initialState = {
    trackHistory: []
};

const trackHistoryReducer = (state = initialState, action) => {
    if (action.type === GET_TRACK_HISTORY_SUCCESS){
        return {...state, trackHistory: action.response}
    }

    return state;
};

export default trackHistoryReducer;