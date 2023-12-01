import { DAILY_DATA_ERROR, DAILY_DATA_REQUEST , DAILY_DATA_SUCCESS } from "../actions/dailyData";

const defaultState = {
    daily: []
};

function dailyDataReducer ( state = defaultState, action) {
    // console.log(action)
    // console.log(state)
    switch (action.type) {
        
        case DAILY_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state
            });

            case DAILY_DATA_SUCCESS:
                return Object.assign({}, {
                    
                    dailyTable: action.payload.dailyTable
                });
                
                
                case DAILY_DATA_ERROR:
                    return Object.assign({}, state, {
                    ...state
            });
            
            default:
                return state;
    }
    
}

export default dailyDataReducer;