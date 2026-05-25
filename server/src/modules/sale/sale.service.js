const prisma = require("../../config/db");

const getAll = async (query = {}) => {
  const { type, status, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {};
  if (type) where.type = type;
  if (status) where.status = status;

  const [sales, total] = await Promise.all([
    prisma.propertySale.findMany({
      where,
      include: {
        property: { select: { id: true, title: true, location: true, imageUrl: true, category: true } },
        customer: { select: { id: true, name: true, phone: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.propertySale.count({ where }),
  ]);

  return {
    sales,
    pagination: { page: parseInt(page), limit: take, total, totalPages: Math.ceil(total / take) },
  };
};

const getById = async (id) => {
  return prisma.propertySale.findUnique({
    where: { id },
    include: {
      property: { include: { buildingDetail: true, apartmentDetail: true } },
      customer: { include: { payments: true } },
    },
  });
};

const create = async (data) => {
  return prisma.propertySale.create({
    data,
    include: {
      property: { select: { id: true, title: true } },
      customer: { select: { id: true, name: true } },
    },
  });
};

const update = async (id, data) => {
  return prisma.propertySale.update({
    where: { id },
    data,
    include: {
      property: { select: { id: true, title: true } },
      customer: { select: { id: true, name: true } },
    },
  });
};

const remove = async (id) => {
  await prisma.propertySale.delete({ where: { id } });
};

module.exports = { getAll, getById, create, update, remove };
