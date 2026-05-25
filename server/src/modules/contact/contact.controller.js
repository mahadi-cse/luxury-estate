const contactService = require("./contact.service");
const { success, created, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const messages = await contactService.getAll();
    return success(res, messages);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return badRequest(res, "name, email, subject, and message are required");
    }
    const contact = await contactService.create(req.body);
    return created(res, contact, "Message sent successfully");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.params.id);
    return success(res, null, "Contact message deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, remove };
