const prisma = require("../../config/db");

const getStats = async () => {
  const [
    totalProperties,
    forSale,
    forRent,
    buildings,
    apartments,
    villas,
    studios,
    totalCustomers,
    totalSales,
    activeSales,
    totalAgents,
    pendingListings,
    unreadContacts,
    revenueAgg,
    dueAgg,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { type: "sale" } }),
    prisma.property.count({ where: { type: "rent" } }),
    prisma.property.count({ where: { category: "building" } }),
    prisma.property.count({ where: { category: "apartment" } }),
    prisma.property.count({ where: { category: "villa" } }),
    prisma.property.count({ where: { category: "studio" } }),
    prisma.customer.count(),
    prisma.propertySale.count(),
    prisma.propertySale.count({ where: { status: "active" } }),
    prisma.agent.count(),
    prisma.listingRequest.count({ where: { status: "pending" } }),
    prisma.contactMessage.count(),
    prisma.propertySale.aggregate({ _sum: { totalPaid: true } }),
    prisma.propertySale.aggregate({ _sum: { totalDue: true } }),
  ]);

  return {
    properties: {
      total: totalProperties,
      forSale,
      forRent,
      byCategory: { buildings, apartments, villas, studios },
    },
    customers: { total: totalCustomers },
    sales: {
      total: totalSales,
      active: activeSales,
      totalRevenue: revenueAgg._sum.totalPaid || 0,
      totalDue: dueAgg._sum.totalDue || 0,
    },
    agents: { total: totalAgents },
    listingRequests: { pending: pendingListings },
    contacts: { unread: unreadContacts },
  };
};

module.exports = { getStats };
