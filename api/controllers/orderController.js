import Order from '../models/order.model.js'// Adjust path as needed
import mongoose from 'mongoose';

class OrderController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const { 
        userId, 
        items, 
        totalOrderPrice, 
        shippingAddress 
      } = req.body;

      // Validate input
      if (!userId || !items || !totalOrderPrice || !shippingAddress) {
        return res.status(400).json({ 
          message: 'Missing required order details' 
        });
      }

      const newOrder = new Order({
        userId,
        items,
        totalOrderPrice,
        shippingAddress
      });

      const savedOrder = await newOrder.save();

      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error creating order', 
        error: error.message 
      });
    }
  }

  // Get a single order by ID
  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ 
          message: 'Invalid order ID' 
        });
      }

      const order = await Order.findById(orderId)
        .populate('userId', 'name email')
        .populate('items.productId', 'name price');

      if (!order) {
        return res.status(404).json({ 
          message: 'Order not found' 
        });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving order', 
        error: error.message 
      });
    }
  }

  // Get all orders for a user
  async getUserOrders(req, res) {
    try {
      const { userId } = req.params;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ 
          message: 'Invalid user ID' 
        });
      }

      const orders = await Order.find({ userId })
        .populate('items.productId', 'name price')
        .sort({ createdAt: -1 });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving user orders', 
        error: error.message 
      });
    }
  }

  // Update order status
  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { orderStatus, paymentStatus } = req.body;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ 
          message: 'Invalid order ID' 
        });
      }

      const updateData = {};
      if (orderStatus) updateData.orderStatus = orderStatus;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId, 
        updateData, 
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ 
          message: 'Order not found' 
        });
      }

      res.status(200).json({
        message: 'Order updated successfully',
        order: updatedOrder
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error updating order', 
        error: error.message 
      });
    }
  }

  // Cancel an order
  async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ 
          message: 'Invalid order ID' 
        });
      }

      const cancelledOrder = await Order.findByIdAndUpdate(
        orderId, 
        { 
          orderStatus: 'Cancelled',
          paymentStatus: 'Failed' 
        }, 
        { new: true }
      );

      if (!cancelledOrder) {
        return res.status(404).json({ 
          message: 'Order not found' 
        });
      }

      res.status(200).json({
        message: 'Order cancelled successfully',
        order: cancelledOrder
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error cancelling order', 
        error: error.message 
      });
    }
  }
}

module.exports = new OrderController();