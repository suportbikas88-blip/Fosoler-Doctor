const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin"
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active"
    },

    permissions: {
      manageFarmers: {
        type: Boolean,
        default: true
      },

      manageExperts: {
        type: Boolean,
        default: true
      },

      manageAI: {
        type: Boolean,
        default: true
      },

      manageNotifications: {
        type: Boolean,
        default: true
      },

      manageMarket: {
        type: Boolean,
        default: true
      }
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);


// Password Hash Before Save
adminSchema.pre("save", async function(next) {

  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});


// Password Compare Method
adminSchema.methods.comparePassword = async function(password){

  return await bcrypt.compare(
    password,
    this.password
  );

};


module.exports = mongoose.model(
  "Admin",
  adminSchema
);
