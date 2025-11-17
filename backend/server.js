import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env file properly
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Debug check
console.log("Loaded Gmail user:", process.env.GMAIL_USER || "❌ Not Found");
console.log("Loaded Gmail pass:", process.env.GMAIL_PASS ? "✅ Present" : "❌ Missing");

const app = express();
app.use(cors());
app.use(express.json());

// Route for sending feedback
app.post("/send-feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `Feedback from ${name}`,
      text: message,
      html: `<p>${message}</p><p><strong>From:</strong> ${name} (${email})</p>`,
    });

    res.json({ success: true, message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    res.status(500).json({ error: "Failed to send feedback." });
  }
});

const PORT = process.env.PORT || 6754;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
