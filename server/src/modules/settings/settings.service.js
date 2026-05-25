const prisma = require("../../config/db");

const DEFAULTS = {
  primaryColor: "#C5A46D",
  logoText: "Estate",
  logoAccent: "Luxe",
  logoImage: "",
};

/**
 * Get site settings (creates default if not exists)
 */
const get = async () => {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "default", ...DEFAULTS },
    });
  }
  return settings;
};

/**
 * Update site settings
 */
const update = async (data) => {
  // Ensure the record exists first
  await get();
  return prisma.siteSettings.update({
    where: { id: "default" },
    data,
  });
};

/**
 * Reset settings to defaults
 */
const reset = async () => {
  await get();
  return prisma.siteSettings.update({
    where: { id: "default" },
    data: DEFAULTS,
  });
};

module.exports = { get, update, reset };
