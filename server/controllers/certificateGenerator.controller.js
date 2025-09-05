// server/controllers/certificate.controller.js
import PDFDocument from "pdfkit";
import { CourseProgress } from "../models/course.progress.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; // your isAuthenticated middleware should set req.id

    // 1) fetch progress + course + user
    const progress = await CourseProgress.findOne({ courseId, userId });
    if (!progress) return res.status(403).json({ success: false, message: "Complete all lectures to download your certificate" });

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // 2) determine completion
    const totalLectures = Array.isArray(course.lectures) ? course.lectures.length : 0;
    const completedCount = Array.isArray(progress.lectureProgress) ? progress.lectureProgress.filter(l => l.viewed).length : 0;
    const isCompleted = progress.completed === true || (totalLectures > 0 && completedCount === totalLectures);

    if (!isCompleted) return res.status(403).json({ success: false, message: "Complete all lectures to download your certificate" });

    // 3) stream PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="certificate-${courseId}.pdf"`);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.pipe(res);

    // Add content — simple pretty template
    doc.fontSize(26).fillColor("#111").text("Certificate of Completion", { align: "center" });
    doc.moveDown(1);
    doc.fontSize(14).fillColor("#444").text("This certifies that", { align: "center" });
    doc.moveDown(0.7);
    doc.fontSize(22).fillColor("#000").text(`${user.name}`, { align: "center" });
    doc.moveDown(0.7);
    doc.fontSize(14).fillColor("#444").text("has successfully completed the course", { align: "center" });
    doc.moveDown(0.7);
    doc.fontSize(18).fillColor("#000").text(`${course.courseTitle || course.title || course.courseTitle}`, { align: "center", underline: true });
    doc.moveDown(1.2);
    doc.fontSize(12).fillColor("#666").text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });

    // Optional: signature area
    doc.moveDown(2);
    const x = doc.page.width / 2 - 120;
    doc.moveTo(x, doc.y).lineTo(x + 160, doc.y).stroke();
    doc.text("Instructor Signature", x, doc.y + 5, { width: 160, align: "center" });

    doc.end();
  } catch (err) {
    console.error("generateCertificate error:", err);
    res.status(500).json({ success: false, message: "Certificate generation failed" });
  }
};
