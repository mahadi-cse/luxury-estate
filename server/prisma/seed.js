require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Clear existing data ─────────────────────────────────
  await prisma.payment.deleteMany();
  await prisma.propertySale.deleteMany();
  await prisma.buildingDetail.deleteMany();
  await prisma.apartmentDetail.deleteMany();
  await prisma.property.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.listingRequest.deleteMany();

  // ─── Properties ──────────────────────────────────────────
  const prop1 = await prisma.property.create({
    data: {
      title: "Premium Duplex in Gulshan",
      price: 45000000,
      location: "Gulshan-2, Dhaka",
      type: "sale",
      category: "apartment",
      status: "completed",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      description: "A stunning duplex penthouse in the heart of Gulshan-2 with panoramic city views. This meticulously designed residence features Italian marble flooring, floor-to-ceiling windows, a private rooftop terrace, and a state-of-the-art modular kitchen.",
      features: ["Italian Marble Flooring", "Central Air Conditioning", "Private Rooftop Terrace", "24/7 Security & CCTV", "Modular Kitchen", "Servant Quarters", "Underground Parking", "Backup Generator"],
      yearBuilt: 2022,
      garage: 2,
      galleryImages: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      ],
      apartmentDetail: {
        create: { floor: 14, totalFloors: 15, facing: "South-West", balconies: 3, furnishing: "semi-furnished", maintenanceCost: 12000 },
      },
    },
  });

  const prop2 = await prisma.property.create({
    data: {
      title: "Furnished Apartment in Banani",
      price: 85000,
      location: "Banani, Dhaka",
      type: "rent",
      category: "apartment",
      status: "ongoing",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      description: "A beautifully furnished apartment in Banani's most sought-after residential block. Move-in ready with premium furniture, modern appliances, and a spacious balcony overlooking the tree-lined avenue.",
      features: ["Fully Furnished", "Split AC in Every Room", "Modern Appliances", "Spacious Balcony", "High-Speed Elevator", "Community Gym Access", "24/7 Security", "Backup Generator"],
      yearBuilt: 2020,
      garage: 1,
      galleryImages: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      ],
      apartmentDetail: {
        create: { floor: 7, totalFloors: 12, facing: "North", balconies: 2, furnishing: "furnished", maintenanceCost: 8000 },
      },
    },
  });

  const prop3 = await prisma.property.create({
    data: {
      title: "Skyline Tower — Commercial Building",
      price: 72000000,
      location: "Purbachal, Dhaka",
      type: "sale",
      category: "building",
      status: "ongoing",
      bedrooms: 0,
      bathrooms: 0,
      sqft: 45000,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      description: "A brand-new 18-storey commercial building in Purbachal New Town. Ideal for investors or businesses looking for a premium address. Features modern architecture, ample parking, and high-speed elevators.",
      features: ["Modern Architecture", "High-Speed Elevators (3)", "Underground Parking (50 cars)", "Rooftop Helipad", "Fire Safety System", "Central HVAC", "Smart Building Management", "Fiber Optic Internet Ready"],
      yearBuilt: 2023,
      garage: 50,
      galleryImages: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      ],
      buildingDetail: {
        create: { totalFloors: 18, totalUnits: 72, availableUnits: 24, floorPlan: "4 units per floor, each 2,500 sqft", buildingAge: "Brand New", developer: "Sheltech Pvt. Ltd." },
      },
    },
  });

  const prop4 = await prisma.property.create({
    data: {
      title: "Modern Flat in Dhanmondi",
      price: 55000,
      location: "Dhanmondi, Dhaka",
      type: "rent",
      category: "apartment",
      status: "completed",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "A sleek, modern flat in the cultural heart of Dhanmondi. Freshly renovated with contemporary interiors, ideal for young professionals or small families. Steps away from Dhanmondi Lake.",
      features: ["Freshly Renovated", "Contemporary Interiors", "Split AC", "Tiled Flooring", "Attached Balcony", "24/7 Security", "Elevator Access", "Backup Generator"],
      yearBuilt: 2019,
      garage: 1,
      galleryImages: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      ],
      apartmentDetail: {
        create: { floor: 5, totalFloors: 10, facing: "East", balconies: 1, furnishing: "unfurnished", maintenanceCost: 5000 },
      },
    },
  });

  const prop5 = await prisma.property.create({
    data: {
      title: "Luxury Penthouse in Uttara",
      price: 38000000,
      location: "Uttara, Dhaka",
      type: "sale",
      category: "apartment",
      status: "upcoming",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2600,
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      description: "A top-floor penthouse in Uttara Sector 7 with unobstructed skyline views. Features a wraparound terrace, open-plan living, designer kitchen, and premium bathroom fittings.",
      features: ["Wraparound Terrace", "Open-Plan Living", "Designer Kitchen", "Premium Bath Fittings", "Central AC", "Intercom System", "Underground Parking", "Backup Generator"],
      yearBuilt: 2021,
      garage: 2,
      galleryImages: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
      ],
      apartmentDetail: {
        create: { floor: 16, totalFloors: 16, facing: "South", balconies: 4, furnishing: "semi-furnished", maintenanceCost: 15000 },
      },
    },
  });

  const prop6 = await prisma.property.create({
    data: {
      title: "Cozy Studio in Bashundhara",
      price: 30000,
      location: "Bashundhara R/A, Dhaka",
      type: "rent",
      category: "studio",
      status: "upcoming",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      description: "A compact yet stylish studio apartment in Bashundhara Residential Area. Perfect for students or single professionals. Close to NSU, IUB, and the Bashundhara City shopping complex.",
      features: ["Built-in Wardrobe", "Kitchenette", "Tiled Flooring", "Balcony", "24/7 Security", "Elevator Access", "Backup Generator", "Gas Connection"],
      yearBuilt: 2018,
      garage: 0,
      galleryImages: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      ],
      apartmentDetail: {
        create: { floor: 3, totalFloors: 8, facing: "West", balconies: 1, furnishing: "furnished", maintenanceCost: 3000 },
      },
    },
  });

  console.log("  ✓ 6 properties created");

  // ─── Customers ───────────────────────────────────────────
  const cust1 = await prisma.customer.create({
    data: {
      name: "Rafiqul Islam",
      phone: "+8801711234567",
      email: "rafiqul.islam@gmail.com",
      profession: "Software Engineer",
      address: "House 12, Road 5, Gulshan-1, Dhaka-1212",
      nid: "1990123456789",
      joinedDate: "2024-01-15",
      interests: ["apartment", "gulshan", "3-bed", "modern"],
      purchasedProperties: [prop1.id],
      rentedProperties: [],
      totalDue: 5000000,
      totalPaid: 40000000,
      notes: "VIP client. Interested in premium properties in Gulshan area.",
      payments: {
        create: [
          { date: "2024-01-20", amount: 10000000, method: "bank", status: "paid", note: "Initial down payment" },
          { date: "2024-04-15", amount: 15000000, method: "bank", status: "paid", note: "Second installment" },
          { date: "2024-07-10", amount: 15000000, method: "check", status: "paid", note: "Third installment" },
          { date: "2024-10-15", amount: 5000000, method: "bank", status: "pending", note: "Final installment — due" },
        ],
      },
    },
  });

  const cust2 = await prisma.customer.create({
    data: {
      name: "Fatema Akter",
      phone: "+8801819876543",
      email: "fatema.akter@yahoo.com",
      profession: "Doctor",
      address: "Apt 7B, Green Valley Tower, Dhanmondi, Dhaka-1205",
      nid: "1985567890123",
      joinedDate: "2024-03-08",
      interests: ["apartment", "dhanmondi", "2-bed", "furnished"],
      purchasedProperties: [],
      rentedProperties: [prop4.id],
      totalDue: 0,
      totalPaid: 165000,
      notes: "Reliable tenant. Always pays on time.",
      payments: {
        create: [
          { date: "2024-03-10", amount: 55000, method: "bkash", status: "paid", note: "March rent" },
          { date: "2024-04-10", amount: 55000, method: "bkash", status: "paid", note: "April rent" },
          { date: "2024-05-10", amount: 55000, method: "bkash", status: "paid", note: "May rent" },
        ],
      },
    },
  });

  const cust3 = await prisma.customer.create({
    data: {
      name: "Mohammad Karim",
      phone: "+8801912345678",
      email: "karim.business@outlook.com",
      profession: "Business Owner",
      address: "Karim Tower, 45 Motijheel C/A, Dhaka-1000",
      nid: "1978234567890",
      joinedDate: "2023-11-20",
      interests: ["building", "commercial", "purbachal", "investment"],
      purchasedProperties: [prop3.id],
      rentedProperties: [],
      totalDue: 22000000,
      totalPaid: 50000000,
      notes: "Large investor. Owns multiple commercial properties across Dhaka.",
      payments: {
        create: [
          { date: "2023-12-01", amount: 20000000, method: "bank", status: "paid", note: "Booking amount" },
          { date: "2024-03-01", amount: 15000000, method: "bank", status: "paid", note: "First installment" },
          { date: "2024-06-01", amount: 15000000, method: "check", status: "paid", note: "Second installment" },
          { date: "2024-09-01", amount: 22000000, method: "bank", status: "overdue", note: "Third installment — overdue" },
        ],
      },
    },
  });

  const cust4 = await prisma.customer.create({
    data: {
      name: "Nusrat Jahan",
      phone: "+8801551234567",
      email: "nusrat.jahan@gmail.com",
      profession: "Teacher",
      address: "House 8, Road 3, Sector 7, Uttara, Dhaka-1230",
      nid: "1992345678901",
      joinedDate: "2024-05-12",
      interests: ["apartment", "uttara", "4-bed", "family"],
      purchasedProperties: [prop5.id],
      rentedProperties: [prop2.id],
      totalDue: 8000000,
      totalPaid: 30085000,
      notes: "Purchased penthouse in Uttara and renting in Banani temporarily.",
      payments: {
        create: [
          { date: "2024-05-15", amount: 15000000, method: "bank", status: "paid", note: "Down payment for Uttara penthouse" },
          { date: "2024-08-15", amount: 15000000, method: "bank", status: "paid", note: "Second installment" },
          { date: "2024-06-01", amount: 85000, method: "cash", status: "paid", note: "Banani apartment rent — June" },
        ],
      },
    },
  });

  const cust5 = await prisma.customer.create({
    data: {
      name: "Tanvir Hasan",
      phone: "+8801671234567",
      email: "tanvir.hasan@gmail.com",
      profession: "Banker",
      address: "Flat 4A, Sunrise Apartments, Bashundhara R/A, Dhaka-1229",
      nid: "1988456789012",
      joinedDate: "2024-06-01",
      interests: ["studio", "bashundhara", "affordable", "single"],
      purchasedProperties: [],
      rentedProperties: [prop6.id],
      totalDue: 30000,
      totalPaid: 60000,
      notes: "Young professional. Looking to upgrade to a larger apartment soon.",
      payments: {
        create: [
          { date: "2024-06-05", amount: 30000, method: "bkash", status: "paid", note: "June rent" },
          { date: "2024-07-05", amount: 30000, method: "bkash", status: "paid", note: "July rent" },
          { date: "2024-08-05", amount: 30000, method: "bkash", status: "pending", note: "August rent — pending" },
        ],
      },
    },
  });

  console.log("  ✓ 5 customers with payments created");

  // ─── Sales ───────────────────────────────────────────────
  await prisma.propertySale.createMany({
    data: [
      { propertyId: prop1.id, customerId: cust1.id, type: "sale", status: "active", salePrice: 45000000, totalPaid: 40000000, totalDue: 5000000, date: "2024-01-15", notes: "Premium duplex sale — 4 installments agreed." },
      { propertyId: prop4.id, customerId: cust2.id, type: "rent", status: "active", salePrice: 55000, totalPaid: 165000, totalDue: 0, date: "2024-03-08", notes: "Monthly rent. Tenant pays via bKash." },
      { propertyId: prop3.id, customerId: cust3.id, type: "sale", status: "active", salePrice: 72000000, totalPaid: 50000000, totalDue: 22000000, date: "2023-11-20", notes: "Commercial building — large investor." },
      { propertyId: prop5.id, customerId: cust4.id, type: "sale", status: "active", salePrice: 38000000, totalPaid: 30000000, totalDue: 8000000, date: "2024-05-12", notes: "Uttara penthouse purchase." },
      { propertyId: prop6.id, customerId: cust5.id, type: "rent", status: "active", salePrice: 30000, totalPaid: 60000, totalDue: 30000, date: "2024-06-01", notes: "Studio rental — monthly bKash payment." },
    ],
  });
  console.log("  ✓ 5 sales created");

  // ─── Agents ──────────────────────────────────────────────
  await prisma.agent.createMany({
    data: [
      { name: "Fatima Rahman", role: "Senior Property Consultant", dealsCount: 142, imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
      { name: "Arif Hossain", role: "Luxury Homes Specialist", dealsCount: 98, imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
      { name: "Nusrat Jahan", role: "Commercial Real Estate Agent", dealsCount: 115, imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
    ],
  });
  console.log("  ✓ 3 agents created");

  // ─── Site Settings ───────────────────────────────────────
  await prisma.siteSettings.create({
    data: { id: "default", primaryColor: "#C5A46D", logoText: "Estate", logoAccent: "Luxe", logoImage: "" },
  });
  console.log("  ✓ Site settings initialized");

  console.log("\n✅ Seed completed successfully!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
