import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin";
  isActive: boolean;
  lastLoginAt?: Date;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(jwtTimestamp: number): boolean;
}

interface IAdminModel extends Model<IAdmin> {
  findByCredentials(email: string, password: string): Promise<IAdmin | null>;
}

const adminSchema = new Schema<IAdmin>(
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
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordChangedAt = new Date();
});

// Compare password method
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if password was changed after JWT was issued
adminSchema.methods.changedPasswordAfter = function (
  jwtTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

// Static method to find admin by credentials
adminSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<IAdmin | null> {
  const admin = await this.findOne({ email }).select("+password");
  if (!admin) return null;

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) return null;

  return admin;
};

const Admin: IAdminModel =
  (mongoose.models.Admin as IAdminModel) ||
  mongoose.model<IAdmin, IAdminModel>("Admin", adminSchema);

export default Admin;