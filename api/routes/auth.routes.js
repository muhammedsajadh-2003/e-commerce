
import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";


const app = express();

app.post('/login', signIn);
app.post('/register',signUp );

export default app;
