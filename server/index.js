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


const port= process.env.PORT ||8080 ;
app.use(
  cors({
    origin: "https://lernify-topaz.vercel.app",
    credentials: true,
  })
);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())



app.use("/user",userRoute)
app.use("/course",courseRoute)
app.use("/media",mediaRoute)
app.use("/purchase",coursePurchaseRoute)
app.use("/progress",courseProgressRoute)

app.get("/", (_, res) => {
  res.send("LMS Backend is running ✅");
});

app.listen(port,()=>{
    dbConnection()


})

