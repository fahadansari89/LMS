import { generateCertificate } from "../controllers/certificateGenerator.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// add (protected)
router.get("/:courseId/certificate", isAuthenticated, generateCertificate);