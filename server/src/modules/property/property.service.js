const prisma = require("../../config/db");

/**
 * Get all properties with optional filters
 */
const getAll = async (query = {}) => {
  const { type, category, status, search, page = 1, limit = 20 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {};
  if (type) where.type = type;
  if (category) where.category = category;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: { buildingDetail: true, apartmentDetail: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.property.count({ where }),
  ]);

  return {
    properties: properties.map(formatProperty),
    pagination: {
      page: parseInt(page),
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Get a single property by ID
 */
const getById = async (id) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: { buildingDetail: true, apartmentDetail: true },
  });
  return property ? formatProperty(property) : null;
};

/**
 * Create a new property
 */
const create = async (data) => {
  const { buildingDetails, apartmentDetails, ...propertyData } = data;

  const property = await prisma.property.create({
    data: {
      ...propertyData,
      buildingDetail: buildingDetails ? { create: buildingDetails } : undefined,
      apartmentDetail: apartmentDetails ? { create: apartmentDetails } : undefined,
    },
    include: { buildingDetail: true, apartmentDetail: true },
  });

  return formatProperty(property);
};

/**
 * Update a property
 */
const update = async (id, data) => {
  const { buildingDetails, apartmentDetails, ...propertyData } = data;

  // Update main property data
  const property = await prisma.property.update({
    where: { id },
    data: propertyData,
  });

  // Handle building details
  if (buildingDetails) {
    await prisma.buildingDetail.upsert({
      where: { propertyId: id },
      update: buildingDetails,
      create: { ...buildingDetails, propertyId: id },
    });
  } else if (property.category !== "building") {
    await prisma.buildingDetail.deleteMany({ where: { propertyId: id } });
  }

  // Handle apartment details
  if (apartmentDetails) {
    await prisma.apartmentDetail.upsert({
      where: { propertyId: id },
      update: apartmentDetails,
      create: { ...apartmentDetails, propertyId: id },
    });
  } else if (!["apartment", "studio"].includes(property.category)) {
    await prisma.apartmentDetail.deleteMany({ where: { propertyId: id } });
  }

  // Re-fetch with relations
  const updated = await prisma.property.findUnique({
    where: { id },
    include: { buildingDetail: true, apartmentDetail: true },
  });

  return formatProperty(updated);
};

/**
 * Delete a property
 */
const remove = async (id) => {
  await prisma.property.delete({ where: { id } });
};

/**
 * Format property for client compatibility
 * Maps `buildingDetail` → `buildingDetails` and `apartmentDetail` → `apartmentDetails`
 */
function formatProperty(p) {
  const { buildingDetail, apartmentDetail, ...rest } = p;
  return {
    ...rest,
    buildingDetails: buildingDetail || undefined,
    apartmentDetails: apartmentDetail || undefined,
  };
}

module.exports = { getAll, getById, create, update, remove };
