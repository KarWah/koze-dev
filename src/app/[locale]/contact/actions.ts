"use server";

import { Resend } from "resend";

export async function sendEmail(prevState: any, formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined in environment variables.");
    return { error: "Configuration error. Please try again later." };
  }

  const resend = new Resend(apiKey);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Koze.dev <onboarding@resend.dev>",
      to: ["karl.wahrenberg@gmail.com"],
      subject: `New message from ${name} via Koze.dev`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error(error);
      return { error: "Failed to send email." };
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred." };
  }
}
