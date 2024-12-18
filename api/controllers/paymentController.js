import Payment from '../models/payment.model.js'; // Assuming the model file is in the models folder
import Order from '../models/order.model.js'; // Assuming you have an Order model

// Create a payment record
export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, paymentStatus, paymentDate } = req.body;

    // Ensure that the orderId exists in the Order model
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    const newPayment = new Payment({
      orderId,
      paymentMethod,
      paymentStatus,
      paymentDate: paymentDate || new Date(),
    });

    await newPayment.save();
    return res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a payment by its ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('orderId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a payment record
export const updatePayment = async (req, res) => {
  try {
    const { paymentMethod, paymentStatus, paymentDate } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentMethod, paymentStatus, paymentDate },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a payment record
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId');
    return res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
