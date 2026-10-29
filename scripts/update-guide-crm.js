const fs = require('fs');
const path = require('path');

const crmPath = path.join(__dirname, '../src/lib/crmStore.ts');
let crm = fs.readFileSync(crmPath, 'utf8');

console.log('Original length:', crm.length);

// 1. Update DailyGuideSchedule interface
const targetInterface = `  transportCoordination: {
    vehicleModel: string;
    licensePlate: string;
    chauffeurName: string;
    routeDescription: string;
    dropoffPoint: string;
  };
  stayHotel: {
    hotelName: string;
    roomType: string;
    checkInTime: string;
    checkOutTime: string;
    conciergeContact: string;
  };`;

const replInterface = `  transportCoordination: {
    vehicleModel: string;
    licensePlate: string;
    chauffeurName: string;
    chauffeurPhone?: string;
    routeDescription: string;
    dropoffPoint: string;
  };
  stayHotel: {
    hotelName: string;
    hotelAddress?: string;
    roomType: string;
    checkInTime: string;
    checkOutTime: string;
    conciergeContact: string;
    frontDeskPhone?: string;
  };`;

if (!crm.includes(targetInterface)) {
  console.log('Target interface already updated or not found, checking if replInterface exists...');
  if (!crm.includes(replInterface)) {
    console.error('Neither target nor repl interface found!');
    process.exit(1);
  }
} else {
  crm = crm.replace(targetInterface, replInterface);
  console.log('Interface updated successfully');
}

// 2. Sharma Days 1-6 updates
// Day 1
const sharmaD1Old = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "Udaipur Airport ➔ NH-48 Express ➔ Fatehsagar Lake Promenade ➔ Badi Pal Jetty ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Badi Pal Private Boat Jetty"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST (Private Shikara check-in)",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)"
        },`;

const sharmaD1New = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Udaipur Airport ➔ NH-48 Express ➔ Fatehsagar Lake Promenade ➔ Badi Pal Jetty ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Badi Pal Private Boat Jetty"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola, Udaipur, Rajasthan 313001",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST (Private Shikara check-in)",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

if (!crm.includes(sharmaD1Old)) {
  console.error('Sharma D1 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD1Old, sharmaD1New);
console.log('Sharma D1 updated');

// Day 2
const sharmaD2Old = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "The Oberoi Udaivilas ➔ Old City Royal Gate ➔ City Palace Badi Pol ➔ Jagdish Temple ➔ Saheliyon-ki-Bari ➔ Monsoon Palace Sajjangarh Hilltop ➔ Udaivilas Porte-Cochère",
          dropoffPoint: "The Oberoi Udaivilas Lobby Porte-Cochère"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)"
        },`;

const sharmaD2New = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "The Oberoi Udaivilas ➔ Old City Royal Gate ➔ City Palace Badi Pol ➔ Jagdish Temple ➔ Saheliyon-ki-Bari ➔ Monsoon Palace Sajjangarh Hilltop ➔ Udaivilas Porte-Cochère",
          dropoffPoint: "The Oberoi Udaivilas Lobby Porte-Cochère"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola, Udaipur, Rajasthan 313001",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

if (!crm.includes(sharmaD2Old)) {
  console.error('Sharma D2 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD2Old, sharmaD2New);
console.log('Sharma D2 updated');

// Day 3
const sharmaD3Old = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Transit to SUJÁN JAWAI Camp)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "Udaivilas ➔ NH-27 Express ➔ Ranakpur Valley Pass ➔ Jawai Granite Koppies ➔ SUJÁN JAWAI Camp",
          dropoffPoint: "SUJÁN JAWAI Camp Main Pavilion"
        },
        stayHotel: {
          hotelName: "SUJÁN JAWAI Luxury Camp",
          roomType: "Royal Tented Suite #04",
          checkInTime: "14:00 IST",
          checkOutTime: "11:00 IST",
          conciergeContact: "Camp Manager Desk (+91 293 325 3500)"
        },`;

const sharmaD3New = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Transit to SUJÁN JAWAI Camp)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Udaivilas ➔ NH-27 Express ➔ Ranakpur Valley Pass ➔ Jawai Granite Koppies ➔ SUJÁN JAWAI Camp",
          dropoffPoint: "SUJÁN JAWAI Camp Main Pavilion"
        },
        stayHotel: {
          hotelName: "SUJÁN JAWAI Luxury Camp",
          hotelAddress: "Jawai Bandh, Bisalpur, Pali District, Rajasthan 306126",
          roomType: "Royal Tented Suite #04",
          checkInTime: "14:00 IST",
          checkOutTime: "11:00 IST",
          conciergeContact: "Camp Manager Desk (+91 293 325 3500)",
          frontDeskPhone: "+91 293 325 3500"
        },`;

if (!crm.includes(sharmaD3Old)) {
  console.error('Sharma D3 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD3Old, sharmaD3New);
console.log('Sharma D3 updated');

// Day 4
const sharmaD4Old = `        transportCoordination: {
          vehicleModel: "SUJÁN Open-Top Safari 4x4 & Defender 110",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "Camp ➔ Kumbhalgarh Ridge Pass ➔ Leopard Escarpments ➔ Return Camp",
          dropoffPoint: "SUJÁN JAWAI Camp Porch"
        },
        stayHotel: {
          hotelName: "SUJÁN JAWAI Luxury Camp",
          roomType: "Royal Tented Suite #04",
          checkInTime: "14:00 IST",
          checkOutTime: "11:00 IST",
          conciergeContact: "Camp Manager Desk (+91 293 325 3500)"
        },`;

const sharmaD4New = `        transportCoordination: {
          vehicleModel: "SUJÁN Open-Top Safari 4x4 & Defender 110",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Camp ➔ Kumbhalgarh Ridge Pass ➔ Leopard Escarpments ➔ Return Camp",
          dropoffPoint: "SUJÁN JAWAI Camp Porch"
        },
        stayHotel: {
          hotelName: "SUJÁN JAWAI Luxury Camp",
          hotelAddress: "Jawai Bandh, Bisalpur, Pali District, Rajasthan 306126",
          roomType: "Royal Tented Suite #04",
          checkInTime: "14:00 IST",
          checkOutTime: "11:00 IST",
          conciergeContact: "Camp Manager Desk (+91 293 325 3500)",
          frontDeskPhone: "+91 293 325 3500"
        },`;

if (!crm.includes(sharmaD4Old)) {
  console.error('Sharma D4 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD4Old, sharmaD4New);
console.log('Sharma D4 updated');

// Day 5
const sharmaD5Old = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "Jawai ➔ NH-27 Express ➔ Udaipur Lake District ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Jetty"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)"
        },`;

const sharmaD5New = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Jawai ➔ NH-27 Express ➔ Udaipur Lake District ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Jetty"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola, Udaipur, Rajasthan 313001",
          roomType: "Kohinoor Lake View Suite #204 & Luxury Pool Rooms",
          checkInTime: "14:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

if (!crm.includes(sharmaD5Old)) {
  console.error('Sharma D5 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD5Old, sharmaD5New);
console.log('Sharma D5 updated');

// Day 6
const sharmaD6Old = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet - Contact via Curator)",
          routeDescription: "Udaivilas ➔ Fatehsagar Promenade ➔ NH-48 Express ➔ Udaipur Airport Gate 1",
          dropoffPoint: "Udaipur Airport (UDR) Terminal 1 Departure Gate 1"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Kohinoor Lake View Suite #204 (Check-out completed by 10:00 IST)",
          checkInTime: "14:00 IST",
          checkOutTime: "10:00 IST (Departure)",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)"
        },`;

const sharmaD6New = `        transportCoordination: {
          vehicleModel: "Land Rover Defender 110 4WD (Black Luxury Edition)",
          licensePlate: "RJ 27 EA 0001",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Udaivilas ➔ Fatehsagar Promenade ➔ NH-48 Express ➔ Udaipur Airport Gate 1",
          dropoffPoint: "Udaipur Airport (UDR) Terminal 1 Departure Gate 1"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola, Udaipur, Rajasthan 313001",
          roomType: "Kohinoor Lake View Suite #204 (Check-out completed by 10:00 IST)",
          checkInTime: "14:00 IST",
          checkOutTime: "10:00 IST (Departure)",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300 - Extension 204)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

if (!crm.includes(sharmaD6Old)) {
  console.error('Sharma D6 old block not found');
  process.exit(1);
}
crm = crm.replace(sharmaD6Old, sharmaD6New);
console.log('Sharma D6 updated');

// 3. Update lead-rohan-2026 Day 1 and 2, and add Days 3, 4, 5
const rohanD1Old = `        transportCoordination: {
          vehicleModel: "Mercedes-Maybach S-Class",
          licensePlate: "RJ 27 EA 0003",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          routeDescription: "Airport ➔ NH-48 Express ➔ Fatehsagar Promenade ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Lakeside Dock"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Premier Pool Suite #112",
          checkInTime: "12:30 IST",
          checkOutTime: "14:00 IST",
          conciergeContact: "French Guest Relations Desk (+91 294 243 3300)"
        },`;

const rohanD1New = `        transportCoordination: {
          vehicleModel: "Mercedes-Maybach S-Class",
          licensePlate: "RJ 27 EA 0003",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Airport ➔ NH-48 Express ➔ Fatehsagar Promenade ➔ The Oberoi Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Lakeside Dock"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola Waterfront, Udaipur 313001",
          roomType: "Premier Pool Suite #112",
          checkInTime: "12:30 IST",
          checkOutTime: "14:00 IST",
          conciergeContact: "French Guest Relations Desk (+91 294 243 3300)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

crm = crm.replace(rohanD1Old, rohanD1New);

const rohanD2Old = `        transportCoordination: {
          vehicleModel: "Vintage 1947 Cadillac Series 62",
          licensePlate: "RJ 27 EA 0003",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          routeDescription: "Udaivilas ➔ Old City Gates ➔ City Palace Complex ➔ Vintage Car Museum ➔ Fatehsagar Sunset Loop ➔ Return",
          dropoffPoint: "The Oberoi Udaivilas Lobby"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Premier Pool Suite #112",
          checkInTime: "12:30 IST",
          checkOutTime: "14:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300)"
        },`;

const rohanD2New = `        transportCoordination: {
          vehicleModel: "Vintage 1947 Cadillac Series 62",
          licensePlate: "RJ 27 EA 0003",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "Udaivilas ➔ Old City Gates ➔ City Palace Complex ➔ Vintage Car Museum ➔ Fatehsagar Sunset Loop ➔ Return",
          dropoffPoint: "The Oberoi Udaivilas Lobby"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola Waterfront, Udaipur 313001",
          roomType: "Premier Pool Suite #112",
          checkInTime: "12:30 IST",
          checkOutTime: "14:00 IST",
          conciergeContact: "Chief Concierge Desk (+91 294 243 3300)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

crm = crm.replace(rohanD2Old, rohanD2New);

const rohanDays345 = fs.readFileSync(path.join(__dirname, 'guide_rohan_days.txt'), 'utf8');

// Insert after Rohan Day 2 closing:
const rohanD2End = `        specialGuideNotes: "Dr. Mathur will lead the private archives session. Emphasize Mewar court school art history.",
        asiPermitNumber: "ASI-ROYAL-ARCH-409"
      }`;

if (!crm.includes(rohanD2End)) {
  console.error('Rohan D2 End not found');
  process.exit(1);
}
crm = crm.replace(rohanD2End, rohanD2End + ',\n' + rohanDays345);
console.log('Rohan Days 3-5 appended');

// 4. Update lead-singhania-2026 Day 1 and replace Day 2 with Days 2, 3, 4, 5
const singhaniaD1Old = `        transportCoordination: {
          vehicleModel: "Convoy of 2x Land Rover Defender 110",
          licensePlate: "RJ 27 EA 0004 & RJ 27 EA 0005",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          routeDescription: "VIP Terminal ➔ Express Corridor ➔ City Bypass ➔ Private Udaipur Jetty",
          dropoffPoint: "The Oberoi Udaivilas Presidential Suite Block"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Presidential Block Suites #201-#204",
          checkInTime: "13:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Presidential Concierge (+91 294 243 3300)"
        },`;

const singhaniaD1New = `        transportCoordination: {
          vehicleModel: "Convoy of 2x Land Rover Defender 110",
          licensePlate: "RJ 27 EA 0004 & RJ 27 EA 0005",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          chauffeurPhone: "+91 98290 11222",
          routeDescription: "VIP Terminal ➔ Express Corridor ➔ City Bypass ➔ Private Udaipur Jetty",
          dropoffPoint: "The Oberoi Udaivilas Presidential Suite Block"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          hotelAddress: "Haridas Ji Ki Magri, Mulla Talai, Lake Pichola Waterfront, Udaipur 313001",
          roomType: "Presidential Block Suites #201-#204",
          checkInTime: "13:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Presidential Concierge (+91 294 243 3300)",
          frontDeskPhone: "+91 294 243 3300"
        },`;

crm = crm.replace(singhaniaD1Old, singhaniaD1New);

const singhaniaD2Old = `      {
        dayNumber: 2,
        date: "2026-12-11",
        dayTitle: "Mewar Dynastic Architecture & Chittorgarh Fort Excursion",
        tourTheme: "Fortress Architecture, Vijay Stambha Victory Tower & Padmini Palace",
        reportingTime: "08:15 IST",
        tourStartTime: "08:30 IST",
        tourEndTime: "18:30 IST",
        meetingPoint: "The Oberoi Udaivilas Presidential Wing Porte-Cochère",
        monumentVisits: [
          {
            siteName: "Chittorgarh Fort & Vijay Stambha (Tower of Victory)",
            duration: "3 hours",
            highlights: "Comprehensive architectural survey of 7th-century Chittorgarh: 9-storey Victory Tower, Kirti Stambha, and Rajput valor chronicles",
            accessType: "After-Hours Private Access",
            entrySlot: "10:30 – 13:30 IST (Special ASI Permit #ASI-FORT-CHT-550)"
          },
          {
            siteName: "Padmini Palace & Water Pavilions",
            duration: "1 hour 30 mins",
            highlights: "Water palace surrounded by lotus moat; mirror legend and historic siege defenses",
            accessType: "Standard VIP",
            entrySlot: "14:30 – 16:00 IST"
          }
        ],
        transportCoordination: {
          vehicleModel: "Convoy of 2x Land Rover Defender 110",
          licensePlate: "RJ 27 EA 0004 & RJ 27 EA 0005",
          chauffeurName: "Vikram Singh (Royal Chauffeur Fleet)",
          routeDescription: "Udaivilas ➔ NH-48 Express ➔ Chittorgarh Ramparts ➔ Victory Tower ➔ Padmini Palace ➔ Return Udaivilas",
          dropoffPoint: "The Oberoi Udaivilas Presidential Suite Block"
        },
        stayHotel: {
          hotelName: "The Oberoi Udaivilas",
          roomType: "Presidential Block Suites #201-#204",
          checkInTime: "13:00 IST",
          checkOutTime: "12:00 IST",
          conciergeContact: "Presidential Concierge (+91 294 243 3300)"
        },
        diningBriefing: {
          breakfast: "Dawn terrace breakfast at Udaivilas",
          lunchVenue: "Chittorgarh Heritage Palace Pavilion",
          lunchMenu: "Traditional Mewari feast with kachoris, rotis, and dry fruit dal",
          highTeaVenue: "Fort Ramparts Sunset Tea (16:30 IST)",
          highTeaMenu: "Hot masala chai and Rajasthani sweets overlooking the plains",
          dinnerVenue: "The Oberoi Udaivilas Lakeside Pavilion",
          dinnerMenu: "Multi-course royal Rajasthani banquet",
          dietaryRestrictions: "Strictly pure vegetarian. No onions or garlic for Mr. Singhania."
        },
        specialGuideNotes: "Dr. Mathur will deliver a 30-minute introductory monograph on Mewar military architecture during the drive.",
        asiPermitNumber: "ASI-FORT-CHT-550"
      }`;

const singhaniaDays2345 = fs.readFileSync(path.join(__dirname, 'guide_singhania_days.txt'), 'utf8');

if (!crm.includes(singhaniaD2Old)) {
  console.error('Singhania D2 old block not found');
  process.exit(1);
}
crm = crm.replace(singhaniaD2Old, singhaniaDays2345);
console.log('Singhania Days 2-5 updated');

fs.writeFileSync(crmPath, crm, 'utf8');
console.log('Successfully written crmStore.ts! New length:', crm.length);
