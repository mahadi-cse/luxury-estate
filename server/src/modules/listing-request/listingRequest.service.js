const prisma = require("../../config/db");

const getAll = async (query = {}) => {
  const { status, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {};
  if (status) where.status = status;

  const [requests, total] = await Promise.all([
    prisma.listingRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.listingRequest.count({ where }),
  ]);

  return {
    requests,
    pagination: { page: parseInt(page), limit: take, total, totalPages: Math.ceil(total / take) },
  };
};

const getById = async (id) => {
  return prisma.listingRequest.findUnique({ where: { id } });
};

const create = async (data) => {
  return prisma.listingRequest.create({ data });
};

const update = async (id, data) => {
  return prisma.listingRequest.update({ where: { id }, data });
};

const remove = async (id) => {
  await prisma.listingRequest.delete({ where: { id } });
};

module.exports = { getAll, getById, create, update, remove };
