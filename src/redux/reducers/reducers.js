import { combineReducers } from "@reduxjs/toolkit"
import hourDataReducer from "./hourDataReducer"
import dailyDataReducer from "./dailyDataReducer"

const reducers =  combineReducers({
    hourDataReducer,
    dailyDataReducer
})

export default reducers