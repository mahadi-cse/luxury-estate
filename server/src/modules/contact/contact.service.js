const prisma = require("../../config/db");

const getAll = async () => {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
};

const create = async (data) => {
  return prisma.contactMessage.create({ data });
};

const remove = async (id) => {
  await prisma.contactMessage.delete({ where: { id } });
};

module.exports = { getAll, create, remove };
