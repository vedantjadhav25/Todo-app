import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoutes from"../backend/routes/todo.route.js";
import userRoutes from"../backend/routes/user.route.js"; 

const app = express(); //yacha artha asa ki axpress navacha app banavla 
dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

//Middlewares
app.use(express.json());//yachyamule json data pn accept hot ahe jo postman madhe yeto
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:'GET,POST,PUT,DELETE',
    allowedHeaders:["Content-Type" , "Authorization"],
})
);
app.use(cookieParser());


//Database conncection code 
const connectDB = async () => {
    try {
        console.log(DB_URI);
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

connectDB();
//routes
app.use("/todo",todoRoutes);
app.use("/user",userRoutes);


app.listen(PORT, () => { //ani listen navacha function ahe jo app mdhe yeto jo 2 parameters accept krto ahe ek port number ani dusra arrow / call back function jo console mdhe message print krto ki server run hot ahe ki nahi 
  console.log(`Server is running on port ${PORT}`);
});