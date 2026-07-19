const readline = require('readline-sync');
const fs = require('fs');

// --- البيانات الثابتة ---
const programs = "\n1. Fat Loss: 3 days cardio + 2 days strength.\n2. Muscle Gain: 4 days heavy lifting + 1 recovery.\n3. Maintenance: 3 days strength + 2 days light cardio.";
const nutrition = "\nFocus on macro balance: 40% Carbs, 30% Protein, 30% Fats.";
const equipment = "\n- VERTEX Boxing Gloves\n- Resistance Bands\n- Core Stabilization Mat\n- Speed Rope";

// --- دالة تسجيل العميل ---
function registerClient() {
    console.log("\n--- Registering New Client ---");
    const clientName = readline.question('Full Name: ');
    const phone = readline.question('Phone: ');
    const email = readline.question('Email: ');
    const nationalId = readline.question('National ID: ');
    const address = readline.question('Address: ');
    const weight = parseFloat(readline.question('Weight (kg): '));
    const height = parseFloat(readline.question('Height (cm): '));
    const age = parseInt(readline.question('Age: '));
    const gender = readline.question('Gender (Male/Female): ');
    const goal = readline.question('Goal (Fat loss/Muscle gain/Maintenance): ');
    const activity = parseInt(readline.question('Activity Level (1-4): '));
    const subscription = readline.question('Subscription Type: ');
    const paymentStatus = readline.question('Payment Status (Paid/Pending): ');
    const medicalConditions = readline.question('Medical Conditions: ');

    const date = new Date().toLocaleDateString();
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    
    const clientData = `
========================================
[DATE: ${date}]
NAME: ${clientName}
PHONE: ${phone} | EMAIL: ${email}
ID: ${nationalId} | ADDRESS: ${address}
TYPE: ${subscription} | PAYMENT: ${paymentStatus}
MEDICAL: ${medicalConditions}
PROFILE: ${weight}kg, ${age}y, ${gender} | BMI: ${bmi}
PLAN: ${goal}
========================================
`;
    // حفظ البيانات في الملف
    fs.appendFileSync('clients_database.txt', clientData);
    console.log("\n--- Client Successfully Registered! ---");
}

// --- دالة البحث عن عميل ---
function searchClient() {
    const nameToFind = readline.question('Enter client name to search: ');
    
    // التأكد من وجود الملف قبل القراءة
    if (!fs.existsSync('clients_database.txt')) {
        console.log("\nNo database file found.");
        return;
    }
    
    const data = fs.readFileSync('clients_database.txt', 'utf8');
    const records = data.split('========================================');
    const found = records.filter(record => record.includes(nameToFind));
    
    if (found.length > 0) {
        console.log("\n--- Search Results ---");
        found.forEach(res => {
            if(res.trim() !== "") console.log(res);
        });
    } else {
        console.log("\nNo client found with that name.");
    }
}

// --- القائمة الرئيسية ---
let running = true;
while (running) {
    console.log("\n--- VERTEXworkout Admin System ---");
    console.log("1. Add New Client");
    console.log("2. Search Client");
    console.log("3. View Programs/Nutrition/Equipment");
    console.log("4. Exit");
    
    let choice = readline.question('Choose an option: ');
    switch(choice) {
        case '1': registerClient(); break;
        case '2': searchClient(); break;
        case '3': 
            console.log("\n--- RESOURCES ---");
            console.log("Programs:", programs);
            console.log("Nutrition:", nutrition);
            console.log("Equipment:", equipment);
            break;
        case '4': 
            running = false; 
            console.log("System Closed. Data secured."); 
            break;
        default: console.log("Invalid option, please try again.");
    }
}