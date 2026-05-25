const listingService = require("./listingRequest.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const result = await listingService.getAll(req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const request = await listingService.getById(req.params.id);
    if (!request) return notFound(res, "Listing request not found");
    return success(res, request);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, category, listingType, contactName, contactPhone } = req.body;
    if (!title || !category || !listingType || !contactName || !contactPhone) {
      return badRequest(res, "title, category, listingType, contactName, and contactPhone are required");
    }
    const request = await listingService.create(req.body);
    return created(res, request, "Listing request submitted");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const request = await listingService.update(req.params.id, req.body);
    return success(res, request, "Listing request updated");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await listingService.remove(req.params.id);
    return success(res, null, "Listing request deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
