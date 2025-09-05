import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/feature/api/authApi.js";
import { courseApi } from "@/feature/api/courseApi.js";
import { purchaseApi } from "@/feature/api/purchaseApi.js";
import { courseProgressApi } from "@/feature/api/courseProgressApi.js";
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
})
const intializeApp=async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
intializeApp()