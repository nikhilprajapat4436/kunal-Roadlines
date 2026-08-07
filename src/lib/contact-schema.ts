import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^[+\d\s-]+$/, { message: "Please enter a valid phone number" }),
  company: z.string().max(100).optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be at most 2000 characters" }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const defaultContactValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};