import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBooking extends Document {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  serviceType: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  deliveryDate?: Date;
  cargoType: string;
  weight: string;
  vehicleType?: string;
  status: "pending" | "confirmed" | "in-transit" | "delivered" | "cancelled";
  amount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      enum: [
        "full-truckload",
        "ltl",
        "cold-chain",
        "container",
        "express",
        "warehousing",
      ],
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    dropLocation: {
      type: String,
      required: [true, "Drop location is required"],
      trim: true,
    },
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    deliveryDate: {
      type: Date,
    },
    cargoType: {
      type: String,
      required: [true, "Cargo type is required"],
      trim: true,
    },
    weight: {
      type: String,
      required: [true, "Weight is required"],
      trim: true,
    },
    vehicleType: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    amount: {
      type: Number,
      min: 0,
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

// Indexes for faster queries
bookingSchema.index({ status: 1 });
bookingSchema.index({ pickupDate: 1 });
bookingSchema.index({ customerEmail: 1 });

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;