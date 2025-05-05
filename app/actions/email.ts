"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Define validation schema for form data
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Type for the form data
export type ContactFormData = z.infer<typeof ContactFormSchema>

// Type for the response
export type EmailResponse = {
  success: boolean
  message: string
}

// Create a transporter (in production, use real SMTP credentials)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
})

// Rate limiting map (simple in-memory solution)
const lastSubmissionTimes: Record<string, number> = {}

export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Check for honeypot field (anti-spam)
    const honeypot = formData.get("website") as string
    if (honeypot) {
      // This is likely a bot if the honeypot field is filled
      // Return success to the bot but don't actually send the email
      return {
        success: true,
        message: "Form submitted successfully",
      }
    }

    // Rate limiting check (allow 1 submission per email every 60 seconds)
    const now = Date.now()
    if (lastSubmissionTimes[email] && now - lastSubmissionTimes[email] < 60000) {
      return {
        success: false,
        message: "Please wait a minute before submitting again",
      }
    }

    // Validate form data
    const result = ContactFormSchema.safeParse({ name, email, message })

    if (!result.success) {
      // Return validation errors
      return {
        success: false,
        message: result.error.errors[0].message,
      }
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "contact@cogaineum.art",
      to: process.env.EMAIL_TO || "artist@cogaineum.art",
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Update rate limiting
    lastSubmissionTimes[email] = now

    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error) {
    console.error("Error sending email:", error)

    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    }
  }
}
