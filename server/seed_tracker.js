require("dotenv").config();
const prisma = require("./src/config/db");

async function main() {
  console.log("=== Seeding Daily Tracker Data to Postgres ===");

  try {
    // Find the ongoing properties
    const bananiApartment = await prisma.property.findFirst({
      where: {
        title: { contains: "Banani" },
        status: "ongoing"
      }
    });

    const skylineTower = await prisma.property.findFirst({
      where: {
        title: { contains: "Skyline" },
        status: "ongoing"
      }
    });

    if (!bananiApartment || !skylineTower) {
      console.error("Could not find the ongoing projects in the database. Please make sure the main properties table is seeded.");
      return;
    }

    console.log(`Found Banani Apartment ID: ${bananiApartment.id}`);
    console.log(`Found Skyline Tower ID: ${skylineTower.id}`);

    // Clean existing tracker records first
    await prisma.projectAccount.deleteMany({});
    await prisma.challan.deleteMany({});
    await prisma.dailyActivity.deleteMany({});
    console.log("Cleared any existing tracker records.");

    // Seeding Banani Apartment Tracker
    console.log("\nSeeding Banani Apartment logs...");
    
    // Log 1
    const act1 = await prisma.dailyActivity.create({
      data: {
        propertyId: bananiApartment.id,
        date: "2026-06-01",
        workDone: "Plastering of 5th floor internal walls & electrical conduit routing.",
        laborCount: 12,
        supervisor: "Engr. Tasnim Ahmed",
        remarks: "Work completed within schedule. Plaster quality verified."
      }
    });

    await prisma.projectAccount.create({
      data: {
        propertyId: bananiApartment.id,
        dailyActivityId: act1.id,
        date: "2026-06-01",
        type: "expense",
        category: "labor",
        amount: 8500,
        paymentMethod: "cash",
        reference: "VCH-2026-104",
        description: "Daily wage payment for plastering masons and helpers."
      }
    });

    await prisma.challan.create({
      data: {
        propertyId: bananiApartment.id,
        dailyActivityId: act1.id,
        challanNo: "CH-9921",
        date: "2026-06-01",
        vendorName: "Bengal Cement Mills Ltd.",
        materialName: "Portland Cement",
        quantity: 100,
        unit: "Bags",
        totalCost: 52000,
        receivedBy: "Tasnim Ahmed",
        status: "approved",
        notes: "Grade 53 OPC. 2 bags damaged in transit (rejected)."
      }
    });

    // Log 2
    const act2 = await prisma.dailyActivity.create({
      data: {
        propertyId: bananiApartment.id,
        date: "2026-05-30",
        workDone: "Brickwork on 6th floor partition walls & bathroom piping installation.",
        laborCount: 16,
        supervisor: "Engr. Tasnim Ahmed",
        remarks: "Slight delay due to mid-day rain, caught up in the evening session."
      }
    });

    await prisma.projectAccount.create({
      data: {
        propertyId: bananiApartment.id,
        dailyActivityId: act2.id,
        date: "2026-05-30",
        type: "expense",
        category: "material",
        amount: 24000,
        paymentMethod: "cash",
        reference: "VCH-2026-098",
        description: "Spot payment to Local Brick Co. for first class bricks."
      }
    });

    await prisma.challan.create({
      data: {
        propertyId: bananiApartment.id,
        dailyActivityId: act2.id,
        challanNo: "CH-9811",
        date: "2026-05-30",
        vendorName: "Bengal Brick Ltd.",
        materialName: "Auto-Bricks Class 1",
        quantity: 3000,
        unit: "Pieces",
        totalCost: 24000,
        receivedBy: "M. Rahman (Storekeeper)",
        status: "approved",
        notes: "Class-1 red bricks. Count verified on delivery."
      }
    });

    // Budget release
    await prisma.projectAccount.create({
      data: {
        propertyId: bananiApartment.id,
        date: "2026-05-28",
        type: "income",
        category: "other",
        amount: 150000,
        paymentMethod: "bank",
        reference: "TRN-901124",
        description: "Allocated petty cash budget release from HQ bank account."
      }
    });

    // Seeding Skyline Tower Tracker
    console.log("\nSeeding Skyline Tower logs...");

    const act3 = await prisma.dailyActivity.create({
      data: {
        propertyId: skylineTower.id,
        date: "2026-06-02",
        workDone: "Casting of 3rd floor columns and lift core shuttering.",
        laborCount: 28,
        supervisor: "Engr. M. A. Karim",
        remarks: "Heavy equipment operator arrived on time. Concrete batching completed."
      }
    });

    await prisma.projectAccount.create({
      data: {
        propertyId: skylineTower.id,
        dailyActivityId: act3.id,
        date: "2026-06-02",
        type: "expense",
        category: "labor",
        amount: 22000,
        paymentMethod: "bank",
        reference: "FT-99120",
        description: "Supervisory staff weekly allowances and daily labor contractor payout."
      }
    });

    await prisma.challan.create({
      data: {
        propertyId: skylineTower.id,
        dailyActivityId: act3.id,
        challanNo: "CH-ST-004",
        date: "2026-06-02",
        vendorName: "BSRM Steel Ltd.",
        materialName: "Deformed Mild Steel Rods (20mm)",
        quantity: 8.5,
        unit: "Tons",
        totalCost: 765000,
        receivedBy: "A. K. Azad (Site Engr.)",
        status: "approved",
        notes: "Grade 500W premium TMT bars. Weight slips attached."
      }
    });

    console.log("\n🎉 Seeding Completed Successfully!");

  } catch (err) {
    console.error("Error seeding tracker data:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
