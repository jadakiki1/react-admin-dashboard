import {hourlyData} from "../../config/config"

export const HOUR_DATA_REQUEST = 'HOUR_REQUEST'
export const HOUR_DATA_SUCCESS = 'HOUR_SUCCESS'
export const HOUR_DATA_ERROR = 'HOUR_ERROR'

const actions = {
    

    fetchHourData: () => async (dispatch) => {
        // console.log("fetchinggg")
        try {
            dispatch({
                type: HOUR_DATA_REQUEST
            });

            const response = await hourlyData()
            console.log(response)
            

            dispatch({
                type: HOUR_DATA_SUCCESS,
                payload: {
                    hourlyTable : response
                },
            });

        } catch (error) {
            console.log(error)
            dispatch({
                type: HOUR_DATA_ERROR,
            });
        }
    }
}

export default actions