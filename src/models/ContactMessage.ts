import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ createdAt: -1 });

const ContactMessage: Model<IContactMessage> =
  (mongoose.models.ContactMessage as Model<IContactMessage>) ||
  mongoose.model<IContactMessage>("ContactMessage", contactMessageSchema);

export default ContactMessage;