// معادلات VERTEXworkout الحيوية
function calculateVertexMetrics(weight, height, age, gender) {
    let bmr;
    
    // حساب BMR بناءً على الجنس
    if (gender === 'رجل') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = bmr * 1.55;

    return {
        bmr: bmr.toFixed(2),
        tdee: tdee.toFixed(2),
        fatLoss: (tdee - 500).toFixed(2),
        muscleGain: (tdee + 300).toFixed(2)
    };
}

// يمكنك تغيير هذه القيم (الوزن، الطول، العمر، الجنس) لتجربة النظام
const clientResult = calculateVertexMetrics(58, 164, 37, 'رجل');

console.log("--- نتائج نظام VERTEXworkout ---");
console.log(clientResult);