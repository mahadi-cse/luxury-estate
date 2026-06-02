const prisma = require("../../config/db");

// ─── Ongoing Projects ──────────────────────────────────────
const getOngoingProperties = async () => {
  return prisma.property.findMany({
    where: {
      status: "ongoing",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProjectSummary = async (propertyId) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) return null;

  // Aggregate project accounts (expenses and income)
  const accounts = await prisma.projectAccount.findMany({
    where: { propertyId },
  });

  const totalExpense = accounts
    .filter((a) => a.type === "expense")
    .reduce((sum, a) => sum + a.amount, 0);

  const totalIncome = accounts
    .filter((a) => a.type === "income")
    .reduce((sum, a) => sum + a.amount, 0);

  // Aggregate challans
  const challans = await prisma.challan.findMany({
    where: { propertyId },
  });

  const totalChallanCount = challans.length;
  const totalChallanCost = challans.reduce((sum, c) => sum + c.totalCost, 0);
  const pendingChallans = challans.filter((c) => c.status === "pending").length;

  // Total daily activity logs
  const activityCount = await prisma.dailyActivity.count({
    where: { propertyId },
  });

  return {
    property,
    stats: {
      totalExpense,
      totalIncome,
      netBalance: totalIncome - totalExpense,
      totalChallanCount,
      totalChallanCost,
      pendingChallans,
      activityCount,
    },
  };
};

// ─── Daily Activities ──────────────────────────────────────
const getActivities = async (propertyId, query = {}) => {
  const { page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [activities, total] = await Promise.all([
    prisma.dailyActivity.findMany({
      where: { propertyId },
      include: {
        accounts: true,
        challans: true,
      },
      orderBy: { date: "desc" },
      skip,
      take,
    }),
    prisma.dailyActivity.count({ where: { propertyId } }),
  ]);

  return {
    activities,
    pagination: {
      page: parseInt(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

const getActivityById = async (id) => {
  return prisma.dailyActivity.findUnique({
    where: { id },
    include: {
      accounts: true,
      challans: true,
      property: true,
    },
  });
};

const createActivity = async (data) => {
  const { propertyId, date, workDone, laborCount, supervisor, remarks, accounts = [], challans = [] } = data;

  // We can create daily activity along with nested accounts and challans if provided
  return prisma.$transaction(async (tx) => {
    const activity = await tx.dailyActivity.create({
      data: {
        propertyId,
        date,
        workDone,
        laborCount: parseInt(laborCount) || 0,
        supervisor: supervisor || "",
        remarks: remarks || "",
      },
    });

    // Create nested accounts if any
    if (accounts && accounts.length > 0) {
      await Promise.all(
        accounts.map((acc) =>
          tx.projectAccount.create({
            data: {
              propertyId,
              dailyActivityId: activity.id,
              date: acc.date || date,
              type: acc.type || "expense",
              category: acc.category || "other",
              amount: parseFloat(acc.amount) || 0,
              paymentMethod: acc.paymentMethod || "cash",
              reference: acc.reference || "",
              description: acc.description || "",
            },
          })
        )
      );
    }

    // Create nested challans if any
    if (challans && challans.length > 0) {
      await Promise.all(
        challans.map((chal) =>
          tx.challan.create({
            data: {
              propertyId,
              dailyActivityId: activity.id,
              challanNo: chal.challanNo,
              date: chal.date || date,
              vendorName: chal.vendorName,
              materialName: chal.materialName,
              quantity: parseFloat(chal.quantity) || 0,
              unit: chal.unit || "unit",
              totalCost: parseFloat(chal.totalCost) || 0,
              receivedBy: chal.receivedBy || "",
              status: chal.status || "received",
              notes: chal.notes || "",
            },
          })
        )
      );
    }

    return tx.dailyActivity.findUnique({
      where: { id: activity.id },
      include: {
        accounts: true,
        challans: true,
      },
    });
  });
};

const updateActivity = async (id, data) => {
  const { date, workDone, laborCount, supervisor, remarks } = data;
  return prisma.dailyActivity.update({
    where: { id },
    data: {
      date,
      workDone,
      laborCount: laborCount !== undefined ? parseInt(laborCount) : undefined,
      supervisor,
      remarks,
    },
  });
};

const removeActivity = async (id) => {
  await prisma.dailyActivity.delete({
    where: { id },
  });
};

// ─── Project Accounts ──────────────────────────────────────
const getAccounts = async (propertyId, query = {}) => {
  const { type, category, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = { propertyId };
  if (type) where.type = type;
  if (category) where.category = category;

  const [accounts, total] = await Promise.all([
    prisma.projectAccount.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take,
    }),
    prisma.projectAccount.count({ where }),
  ]);

  return {
    accounts,
    pagination: {
      page: parseInt(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

const createAccount = async (data) => {
  const { propertyId, dailyActivityId, date, type, category, amount, paymentMethod, reference, description } = data;
  return prisma.projectAccount.create({
    data: {
      propertyId,
      dailyActivityId: dailyActivityId || null,
      date,
      type,
      category,
      amount: parseFloat(amount) || 0,
      paymentMethod,
      reference: reference || "",
      description: description || "",
    },
  });
};

const updateAccount = async (id, data) => {
  const { date, type, category, amount, paymentMethod, reference, description, dailyActivityId } = data;
  return prisma.projectAccount.update({
    where: { id },
    data: {
      date,
      type,
      category,
      amount: amount !== undefined ? parseFloat(amount) : undefined,
      paymentMethod,
      reference,
      description,
      dailyActivityId: dailyActivityId !== undefined ? dailyActivityId : undefined,
    },
  });
};

const removeAccount = async (id) => {
  await prisma.projectAccount.delete({
    where: { id },
  });
};

// ─── Challans ──────────────────────────────────────────────
const getChallans = async (propertyId, query = {}) => {
  const { status, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = { propertyId };
  if (status) where.status = status;

  const [challans, total] = await Promise.all([
    prisma.challan.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take,
    }),
    prisma.challan.count({ where }),
  ]);

  return {
    challans,
    pagination: {
      page: parseInt(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

const createChallan = async (data) => {
  const {
    propertyId,
    dailyActivityId,
    challanNo,
    date,
    vendorName,
    materialName,
    quantity,
    unit,
    totalCost,
    receivedBy,
    status,
    notes,
  } = data;

  return prisma.$transaction(async (tx) => {
    const challan = await tx.challan.create({
      data: {
        propertyId,
        dailyActivityId: dailyActivityId || null,
        challanNo,
        date,
        vendorName,
        materialName,
        quantity: parseFloat(quantity) || 0,
        unit,
        totalCost: parseFloat(totalCost) || 0,
        receivedBy: receivedBy || "",
        status: status || "received",
        notes: notes || "",
      },
    });

    // Automatically create a corresponding expense account entry if totalCost > 0 and status is approved/received
    if (totalCost && parseFloat(totalCost) > 0) {
      await tx.projectAccount.create({
        data: {
          propertyId,
          dailyActivityId: dailyActivityId || null,
          date,
          type: "expense",
          category: "material",
          amount: parseFloat(totalCost),
          paymentMethod: "cash", // default
          reference: `Challan #${challanNo}`,
          description: `Material: ${materialName} (${quantity} ${unit}) from ${vendorName}`,
        },
      });
    }

    return challan;
  });
};

const updateChallan = async (id, data) => {
  const {
    date,
    challanNo,
    vendorName,
    materialName,
    quantity,
    unit,
    totalCost,
    receivedBy,
    status,
    notes,
    dailyActivityId,
  } = data;

  return prisma.challan.update({
    where: { id },
    data: {
      date,
      challanNo,
      vendorName,
      materialName,
      quantity: quantity !== undefined ? parseFloat(quantity) : undefined,
      unit,
      totalCost: totalCost !== undefined ? parseFloat(totalCost) : undefined,
      receivedBy,
      status,
      notes,
      dailyActivityId: dailyActivityId !== undefined ? dailyActivityId : undefined,
    },
  });
};

const removeChallan = async (id) => {
  await prisma.challan.delete({
    where: { id },
  });
};

module.exports = {
  getOngoingProperties,
  getProjectSummary,
  // Activities
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  removeActivity,
  // Accounts
  getAccounts,
  createAccount,
  updateAccount,
  removeAccount,
  // Challans
  getChallans,
  createChallan,
  updateChallan,
  removeChallan,
};
