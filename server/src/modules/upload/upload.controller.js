const { success, badRequest } = require("../../utils/apiResponse");

/**
 * Upload a single image
 */
const uploadSingle = (req, res, next) => {
  try {
    if (!req.file) return badRequest(res, "No image file provided");

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const url = `${baseUrl}/uploads/${req.file.filename}`;

    return success(res, { url, filename: req.file.filename }, "Image uploaded");
  } catch (err) {
    next(err);
  }
};

/**
 * Upload multiple images
 */
const uploadMultiple = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return badRequest(res, "No image files provided");
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const urls = req.files.map((file) => ({
      url: `${baseUrl}/uploads/${file.filename}`,
      filename: file.filename,
    }));

    return success(res, urls, `${urls.length} image(s) uploaded`);
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadSingle, uploadMultiple };
