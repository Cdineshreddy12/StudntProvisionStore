import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot be more than 100 characters"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function (v) {
        // Basic URL validation
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  salePrice: {
    type: Number,
    min: [0, "Sale price cannot be negative"],
    validate: {
      validator: function (v) {
        return v < this.price;
      },
      message: "Sale price must be less than regular price",
    },
  },
  rating: {
    type: Number,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be more than 5"],
  },
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      comment: String,
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Books",
      "Sports & Outdoors",
      "Beauty & Personal Care",
    ],
    trim: true,
  },
  isFlashDeal: {
    type: Boolean,
    default: false,
  },
  flashPrice: {
    type: Number,
    min: [0, "Flash deal price cannot be negative"],
    validate: {
      validator: function (v) {
        return !this.isFlashDeal || (v && v < this.price);
      },
      message:
        "Flash price must be set and less than regular price for flash deals",
    },
  },
  timeLeft: {
    type: Number,
    min: [0, "Time left cannot be negative"],
    validate: {
      validator: function (v) {
        return !this.isFlashDeal || v > 0;
      },
      message: "Time left must be set for flash deals",
    },
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Product", productSchema);
