// /api/apply.ts (Create this file at the root of your project)
import type { VercelRequest, VercelResponse } from "@vercel/node";
import Mailgun from "mailgun.js";
import FormData from "form-data";
// @ts-ignore: Missing type declarations for formidable
import { IncomingForm } from "formidable";
import fs from "fs";

interface ApplicationFields {
  firstName?: string | string[];
  lastName?: string | string[];
  email?: string | string[];
  phone?: string | string[];
  linkedin?: string | string[];
  jobTitle?: string | string[];
}

interface FormidableFile {
  filepath: string;
  originalFilename?: string;
  [key: string]: any;
}

interface ApplicationFiles {
  resume?: FormidableFile | FormidableFile[];
}

// Disable default body parser so formidable can process the multipart form stream
export const config = {
  api: { bodyParser: false },
};

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "", // Use Vercel env variable
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const form = new IncomingForm();
    
    // Parse the incoming form data
    const [fields, files] = await new Promise<[ApplicationFields, ApplicationFiles]>((resolve, reject) => {
      form.parse(req, (err: Error | null, fields: ApplicationFields, files: ApplicationFiles) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Formidable returns arrays for fields. Grab the first item.
    const getField = (field: string | string[] | undefined): string | undefined =>
      Array.isArray(field) ? field[0] : field;
    
    const firstName = getField(fields.firstName);
    const lastName = getField(fields.lastName);
    const email = getField(fields.email);
    const phone = getField(fields.phone);
    const linkedin = getField(fields.linkedin);
    const jobTitle = getField(fields.jobTitle);

    // Handle the attached resume file
    const resumeFile: FormidableFile | undefined = Array.isArray(files.resume) ? files.resume[0] : files.resume;
    let attachment: { filename: string; data: Buffer } | undefined;
    
    if (resumeFile) {
      const fileData = fs.readFileSync(resumeFile.filepath);
      attachment = {
        filename: resumeFile.originalFilename || "resume",
        data: fileData,
      };
    }

    // Send the email via Mailgun
    const data = await mg.messages.create("sandbox23830b4d03b649ed986301bdcd048394.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox23830b4d03b649ed986301bdcd048394.mailgun.org>",
      to: ["Skyveon <hr@skyveon.ai>"],
      subject: `New Application - ${jobTitle} (${firstName} ${lastName})`,
      text: `Position: ${jobTitle}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin}`,
      attachment: attachment,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Mailgun Error:", error);
    res.status(500).json({ success: false, error: "Email delivery failed" });
  }
}