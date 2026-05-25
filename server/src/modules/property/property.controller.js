const propertyService = require("./property.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const result = await propertyService.getAll(req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const property = await propertyService.getById(req.params.id);
    if (!property) return notFound(res, "Property not found");
    return success(res, property);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, price, location, type, category } = req.body;
    if (!title || !price || !location || !type || !category) {
      return badRequest(res, "title, price, location, type, and category are required");
    }
    const property = await propertyService.create(req.body);
    return created(res, property, "Property created");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const property = await propertyService.update(req.params.id, req.body);
    return success(res, property, "Property updated");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await propertyService.remove(req.params.id);
    return success(res, null, "Property deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
