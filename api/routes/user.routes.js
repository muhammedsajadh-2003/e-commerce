import express from "express";
import { verifyToken } from "../utils/index.js";
import { addProduct, addToCart, deleteProduct, getAllProducts, getCart, getSingleProduct, updateProduct } from "../controllers/user.controller.js";

const app = express();

app.post('/add-product', verifyToken, addProduct); 
app.patch('/update-product/:productId', verifyToken, updateProduct);
app.delete('/delete-product/:productId', verifyToken, deleteProduct);
app.get('/all-products', verifyToken, getAllProducts);
app.get('/get-product/:productId', verifyToken, getSingleProduct);
app.post('/add-cart',verifyToken, addToCart);
app.get('/cart-items',verifyToken, getCart);

export default app;