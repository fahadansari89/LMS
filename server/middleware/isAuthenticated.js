import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // If no token → user is not logged in
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please log in first.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID to request object
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);

    // Handle expired token error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired! Please log in again.",
      });
    }

    // Handle invalid token error
    return res.status(401).json({
      success: false,
      message: "Invalid token! Please log in again.",
    });
  }
};
