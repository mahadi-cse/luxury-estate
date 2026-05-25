const customerService = require("./customer.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const result = await customerService.getAll(req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const customer = await customerService.getById(req.params.id);
    if (!customer) return notFound(res, "Customer not found");
    return success(res, customer);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      return badRequest(res, "name, phone, and email are required");
    }
    const customer = await customerService.create(req.body);
    return created(res, customer, "Customer created");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const customer = await customerService.update(req.params.id, req.body);
    return success(res, customer, "Customer updated");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await customerService.remove(req.params.id);
    return success(res, null, "Customer deleted");
  } catch (err) {
    next(err);
  }
};

// ─── Payments ──────────────────────────────────────────────
const addPayment = async (req, res, next) => {
  try {
    const { date, amount, method } = req.body;
    if (!date || !amount || !method) {
      return badRequest(res, "date, amount, and method are required");
    }
    const payment = await customerService.addPayment(req.params.id, req.body);
    return created(res, payment, "Payment added");
  } catch (err) {
    next(err);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const payment = await customerService.updatePayment(req.params.id, req.params.paymentId, req.body);
    if (!payment) return notFound(res, "Payment not found for this customer");
    return success(res, payment, "Payment updated");
  } catch (err) {
    next(err);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const result = await customerService.deletePayment(req.params.id, req.params.paymentId);
    if (!result) return notFound(res, "Payment not found for this customer");
    return success(res, null, "Payment deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll, getById, create, update, remove,
  addPayment, updatePayment, deletePayment,
};
