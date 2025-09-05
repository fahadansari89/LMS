import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../feature/authSlice.js"
import { authApi } from "@/feature/api/authApi"
import { courseApi } from "@/feature/api/courseApi.js";
import { purchaseApi } from "@/feature/api/purchaseApi.js";
import { courseProgressApi } from "@/feature/api/courseProgressApi.js";

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer
})
export default rootReducer;