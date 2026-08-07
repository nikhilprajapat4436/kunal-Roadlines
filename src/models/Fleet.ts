import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IFleet extends Document {
  name: string;
  type: string;
  capacity: string;
  registrationNumber: string;
  status: "available" | "in-transit" | "maintenance" | "out-of-service";
  driverName?: string;
  driverPhone?: string;
  imageUrl?: string;
  location?: string;
  lastServiceDate?: Date;
  nextServiceDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const fleetSchema = new Schema<IFleet>(
  {
    name: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: [
        "mini-truck",
        "lcv",
        "mhv",
        "flatbed-trailer",
        "reefer",
        "container-trailer",
      ],
    },
    capacity: {
      type: String,
      required: [true, "Capacity is required"],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["available", "in-transit", "maintenance", "out-of-service"],
      default: "available",
    },
    driverName: {
      type: String,
      trim: true,
    },
    driverPhone: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    lastServiceDate: {
      type: Date,
    },
    nextServiceDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
fleetSchema.index({ status: 1 });
fleetSchema.index({ type: 1 });

const Fleet: Model<IFleet> =
  (mongoose.models.Fleet as Model<IFleet>) ||
  mongoose.model<IFleet>("Fleet", fleetSchema);

export default Fleet;