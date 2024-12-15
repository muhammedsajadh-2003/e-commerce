import express from "express";
import { verifyToken } from "../utils/index.js";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/productController.js";

const app = express();

app.post('/add-product', verifyToken, addProduct  );
app.patch('/update-product/:productId', verifyToken, updateProduct);
app.delete('/delete-product/:productId', verifyToken, deleteProduct);
app.get('/all-products', verifyToken, getAllProducts);

export default app;