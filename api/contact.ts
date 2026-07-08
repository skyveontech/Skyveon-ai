import type { VercelRequest, VercelResponse } from "@vercel/node";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "", 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, company, service, message } = req.body;

    const subject = `Project Inquiry from ${name}${company ? ` — ${company}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      service ? `Service: ${service}` : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const data = await mg.messages.create("skyveon.ai", {
      from: "Mailgun Sandbox <postmaster@skyveon.ai>",
      to: ["Skyveon <hr@skyveon.ai>"],
      subject: subject,
      text: body,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Mailgun Error:", error);
    res.status(500).json({ success: false, error: "Email delivery failed" });
  }
}