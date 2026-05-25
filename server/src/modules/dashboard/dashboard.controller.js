const dashboardService = require("./dashboard.service");
const { success } = require("../../utils/apiResponse");

const getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getStats();
    return success(res, stats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
