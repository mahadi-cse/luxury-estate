const saleService = require("./sale.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const result = await saleService.getAll(req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const sale = await saleService.getById(req.params.id);
    if (!sale) return notFound(res, "Sale record not found");
    return success(res, sale);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { propertyId, customerId, type } = req.body;
    if (!propertyId || !customerId || !type) {
      return badRequest(res, "propertyId, customerId, and type are required");
    }
    const sale = await saleService.create(req.body);
    return created(res, sale, "Sale record created");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const sale = await saleService.update(req.params.id, req.body);
    return success(res, sale, "Sale record updated");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await saleService.remove(req.params.id);
    return success(res, null, "Sale record deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
