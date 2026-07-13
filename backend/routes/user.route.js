import express from "express";

import {register,
        login, 
        logout } from "../controller/user.controller.js"; //yachyamuule register function import hoto jo user.controller mdhe yeto

const router =express.Router(); //yachyamuule router object create hoto jo express mdhe yeto

router.post("/signup" , register); //yachyamuule signup navacha route create hoto jo register function call karto jo user.controller mdhe yeto
router.post("/login" , login); //yachyamuule login navacha route create hoto jo login function call karto jo user.controller mdhe yeto
router.get("/logout" , logout); //yachyamuule logout navacha route create hoto jo logout function call karto jo user.controller mdhe yeto

export default router; //yachyamuule router object export hoto jyachyamule dusrya file mdhe import krun use karta yeto.