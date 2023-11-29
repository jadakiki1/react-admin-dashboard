import {dailyData} from "../../config/config"

export const DAILY_DATA_REQUEST = 'DAILY_REQUEST'
export const DAILY_DATA_SUCCESS = 'DAILY_SUCCESS'
export const DAILY_DATA_ERROR = 'DAILY_ERROR'

const actions = {
     fetchDailyData: () => async (dispatch) => {
        try {
            dispatch({
                type: DAILY_DATA_REQUEST
            });
            const response = await dailyData()

            dispatch({
                type: DAILY_DATA_SUCCESS,
                payload: {
                    dailyTable : response
                },
            });

        } catch (error) {
            console.log(error)
            console.log("heeee")
            dispatch({
                type: DAILY_DATA_ERROR,
            });
        }
    }
}

export default actions