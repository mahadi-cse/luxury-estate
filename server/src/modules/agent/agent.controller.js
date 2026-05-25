const agentService = require("./agent.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

const getAll = async (req, res, next) => {
  try {
    const agents = await agentService.getAll();
    return success(res, agents);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const agent = await agentService.getById(req.params.id);
    if (!agent) return notFound(res, "Agent not found");
    return success(res, agent);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return badRequest(res, "name is required");
    const agent = await agentService.create(req.body);
    return created(res, agent, "Agent created");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const agent = await agentService.update(req.params.id, req.body);
    return success(res, agent, "Agent updated");
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await agentService.remove(req.params.id);
    return success(res, null, "Agent deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
