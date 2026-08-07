import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICompanySettings extends Document {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  website: string;
  established: number;
  fleetSize: number;
  employees: number;
  deliveryRate: string;
  description: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  updatedAt: Date;
}

const companySettingsSchema = new Schema<ICompanySettings>(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    altPhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    established: {
      type: Number,
    },
    fleetSize: {
      type: Number,
      default: 0,
    },
    employees: {
      type: Number,
      default: 0,
    },
    deliveryRate: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

const CompanySettings: Model<ICompanySettings> =
  (mongoose.models.CompanySettings as Model<ICompanySettings>) ||
  mongoose.model<ICompanySettings>("CompanySettings", companySettingsSchema);

export default CompanySettings;