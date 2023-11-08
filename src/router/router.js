// // Hacemos los importes necesarios
import { Router } from "express";
import { init , home , getIdUser , closeSvent , register , msjF , interfaz , login , loginSpace , createP , createProduct, addF , addFriend } from "../controllers/controllers.js";
// // Hacemos las declaraciones necesarias
const router = Router()

// // declaracion de las rutas
// // task ESTO SON RUTAS DE ACCESO...
router.get('/' , home)
router.get('/init' , init)
router.post('/register' , register)
router.get('/interface' , interfaz)
router.get('/login' , login)
router.post('/loginSpace' , loginSpace)
router.get('/createP' , createP)
router.post('/createProduct' , createProduct)
router.get('/addFriend' , addFriend)
router.post('/addF' , addF)
router.post('/msjF' , msjF)
router.get('/getIdUser/:id' , getIdUser)
router.get('/closeSvent' , closeSvent)

// // expartamos las rutas
export default router