import mongoose from "mongoose";

const otpCodeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 128,
        },
        code: {
            type: String,
            required: true,
        },
    }
);

export const OtpCode = mongoose.model('OtpCode', otpCodeSchema );