import express from "express";
import { createTodo, getTodos , updateTodo , deleteTodo} from "../controller/todo.controller.js";
import { authenticate } from "../Middleware/authorize.js";

const router = express.Router(); //yachyamule router navacha object create hot ahe jo express mdhe yeto jyachyamule route define hotat.

router.post("/create",authenticate,createTodo);  
router.get("/fetch",authenticate,getTodos);
router.put("/update/:id",authenticate, updateTodo);
router.delete("/delete/:id",authenticate, deleteTodo);

export default router; //yachyamuule router object export hoto jyachyamule dusrya file mdhe import krun use karta yeto.