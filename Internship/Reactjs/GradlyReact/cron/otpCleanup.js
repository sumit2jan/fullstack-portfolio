const cron = require("node-cron");
const Student = require("../models/student.model");

// Har 1 minute chalega
cron.schedule("*/10 * * * *", async () => {
    console.log("⏳ Running OTP cleanup...");

    try {
        const result = await Student.updateMany(
            {
                otpExpiry: { $lt: new Date() }, // ✅ FIX
                otp: { $ne: null }
            },
            {
                $set: {
                    otp: null,
                    otpExpiry: null
                }
            }
        );

        console.log(`✅ Cleared OTPs: ${result.modifiedCount}`);
    } catch (err) {
        console.error("❌ Error in cron:", err);
    }
});