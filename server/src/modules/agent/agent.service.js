const prisma = require("../../config/db");

const getAll = async () => {
  return prisma.agent.findMany({ orderBy: { dealsCount: "desc" } });
};

const getById = async (id) => {
  return prisma.agent.findUnique({ where: { id } });
};

const create = async (data) => {
  return prisma.agent.create({ data });
};

const update = async (id, data) => {
  return prisma.agent.update({ where: { id }, data });
};

const remove = async (id) => {
  await prisma.agent.delete({ where: { id } });
};

module.exports = { getAll, getById, create, update, remove };
