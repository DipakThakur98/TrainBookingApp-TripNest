const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join("d:/React_4/TripNest/backend/.env") });

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "PRESENT" : "MISSING");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: `"TripNest Test" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: "Test Gmail Connection",
  text: "This is a test email from TripNest to verify Gmail SMTP."
}, (err, info) => {
  if (err) {
    console.error("❌ ERROR DETAILS:", err);
  } else {
    console.log("✅ SUCCESS DETAILS:", info);
  }
});
