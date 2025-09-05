import express from "express"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCheckOutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js"

const router=express.Router()

router.route("/checkout/create-checkout-sessions").post(isAuthenticated, createCheckOutSession)
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook)
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus)
router.route("/").get(isAuthenticated,getAllPurchasedCourse)

export default router
