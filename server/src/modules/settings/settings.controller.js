const settingsService = require("./settings.service");
const { success } = require("../../utils/apiResponse");

const get = async (req, res, next) => {
  try {
    const settings = await settingsService.get();
    return success(res, settings);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const settings = await settingsService.update(req.body);
    return success(res, settings, "Settings updated");
  } catch (err) {
    next(err);
  }
};

const reset = async (req, res, next) => {
  try {
    const settings = await settingsService.reset();
    return success(res, settings, "Settings reset to defaults");
  } catch (err) {
    next(err);
  }
};

module.exports = { get, update, reset };
