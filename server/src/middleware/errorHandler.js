/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);

  // Prisma known errors
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with this value already exists",
      field: err.meta?.target,
    });
  }

  if (err.code === "P2003") {
    return res.status(400).json({
      success: false,
      message: "Related record not found (foreign key constraint)",
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
