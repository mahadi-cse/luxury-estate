const prisma = require("../../config/db");

const getAll = async (query = {}) => {
  const { search, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { nid: { contains: search, mode: "insensitive" } },
    ];
  }

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: { payments: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    customers,
    pagination: {
      page: parseInt(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

const getById = async (id) => {
  return prisma.customer.findUnique({
    where: { id },
    include: { payments: true, sales: true },
  });
};

const create = async (data) => {
  return prisma.customer.create({ data });
};

const update = async (id, data) => {
  return prisma.customer.update({ where: { id }, data });
};

const remove = async (id) => {
  await prisma.customer.delete({ where: { id } });
};

// ─── Payment sub-resource ──────────────────────────────────
const addPayment = async (customerId, paymentData) => {
  return prisma.payment.create({
    data: { ...paymentData, customerId },
  });
};

const updatePayment = async (customerId, paymentId, data) => {
  // Verify payment belongs to customer
  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, customerId },
  });
  if (!payment) return null;

  return prisma.payment.update({
    where: { id: paymentId },
    data,
  });
};

const deletePayment = async (customerId, paymentId) => {
  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, customerId },
  });
  if (!payment) return null;

  await prisma.payment.delete({ where: { id: paymentId } });
  return true;
};

module.exports = {
  getAll, getById, create, update, remove,
  addPayment, updatePayment, deletePayment,
};
