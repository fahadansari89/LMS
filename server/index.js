import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/connection.js";
import userRoute from "./routes/user.route.js";
import cookie from "cookie-parser"
import cors from "cors"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import coursePurchaseRoute from "./routes/coursePurchase.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config()
const app =express(); 
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}

const port=8080 || process.env.PORT;
app.use(cors(corsOption))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())



app.use("/user",userRoute)
app.use("/course",courseRoute)
app.use("/media",mediaRoute)
app.use("/purchase",coursePurchaseRoute)
app.use("/progress",courseProgressRoute)


app.listen(port,()=>{
    dbConnection()


})

