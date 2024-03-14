const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");
const emailTemplate = require("../mailTemplate/otp");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,    // auto-Delete doc after  5 min
    }
});


async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


OTPSchema.pre("save", async function (next) {
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);
