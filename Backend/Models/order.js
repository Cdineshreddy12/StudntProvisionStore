import { Schema, model } from 'mongoose';
const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3], // 0: Pending, 1: Preparing, 2: Out for Delivery, 3: Delivered
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    price: Number
  }]
});

export default model('Order', orderSchema);