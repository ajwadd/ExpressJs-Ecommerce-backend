const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
      name: {
          type: String,
          trim: true,
          uppercase: true,
          required: 'ame is required',
          minlength: [6, 'To short'],
          maxlength: [12, 'To long'],
      },
      expiry : {
          type: Date,
          required: true
      },
      discount : {
        type: Number,
        required: true
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
