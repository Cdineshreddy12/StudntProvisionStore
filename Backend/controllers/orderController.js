import Order from "../Models/Order.js";

// /orders?page=1&limit=10

export async function getAllOrders(req, res) {
  try {
    const {
      startDate,
      endDate,
      status,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (status) {
      query.status = parseInt(status);
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// export async function getOrderById(req, res) {
//   console.log(req.params.id);
//   try {
//     const order = await Order.findById(req.params.id);
//     res.send(order);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//  {
//   "orderId": "ORD005",
//   "customer": {
//     "name": "Charlie White",
//     "email": "charlie.white@example.com"
//   },
//   "status": 1,
//   "date": "2024-09-14T12:00:00Z",
//   "total": 150.0,
//   "items": [
//     {
//       "productId": "66e5738198c56c9ac912e60d",
//       "quantity": 1,
//       "price": 100.00
//     },
//     {
//       "productId": "66e5738198c56c9ac912e60e",
//       "quantity": 2,
//       "price": 25.00
//     }
//   ]
// }

export async function createOrder(req, res) {
  try {
    const newOrder = new Order({
      orderId: req.body.orderId,
      customer: {
        name: req.body.customer.name,
        email: req.body.customer.email,
      },
      status: req.body.status,
      date: req.body.date,
      total: req.body.total,
      items: req.body.items,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// export async function updateOrder(req, res) {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         customer: {
//           name: req.body.customer.name,
//           email: req.body.customer.email,
//         },
//         status: req.body.status,
//         date: req.body.date,
//         total: req.body.total,
//         items: req.body.items,
//       },
//       { new: true }
//     );
//     if (!updatedOrder)
//       return res.status(404).json({ message: "Order not found" });
//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

export async function updateOrder(req, res) {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id }, // Search by orderId
      {
        customer: {
          name: req.body.customer.name,
          email: req.body.customer.email,
        },
        status: req.body.status,
        date: req.body.date,
        total: req.body.total,
        items: req.body.items,
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// export async function deleteOrder(req, res) {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export async function deleteOrder(req, res) {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id }); // Search by orderId
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
