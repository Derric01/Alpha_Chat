import { ResendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
  if (!email || !name || !clientUrl) {
    console.error("sendWelcomeEmail missing parameters");
    return { ok: false, error: "missing parameters" };
  }

  try {
    const result = await ResendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to AlphaChatter!!",
      html: createWelcomeEmailTemplate(name, clientUrl),
    });

    console.log("Welcome email sent successfully:", result);
    return { ok: true, result };
  } catch (err) {
    console.error("Error sending welcome email:", err);
    return { ok: false, error: err };
  }
};