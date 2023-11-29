import { HOUR_DATA_ERROR, HOUR_DATA_REQUEST , HOUR_DATA_SUCCESS } from "../actions/hourData";

const defaultState = {
    hourly: []
};

function hourDataReducer ( state = defaultState, action) {
    switch (action.type) {
        case HOUR_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state
            });

            case HOUR_DATA_SUCCESS:
                return Object.assign({}, state, {
                    ...state,
                    hourlyTable: action.payload.hourlyTable
                });

                case HOUR_DATA_ERROR:
                    return Object.assign({}, state, {
                    ...state
            });

            default:
                return state;
    }
}

export default hourDataReducer;