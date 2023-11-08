// * Hacemos las improttaciones necesarias
import e from "express"
import { pool } from "../db.js"

//  // declaracion de variables 
let user_id = 0
let name_user = ''
let id__ = 0
let msj_json = []
// // Aqui estaran todas las funcioens
export const init = (req,res) => {
    // res.json(result[0])
    res.render('createUser.ejs' )
}
export const addFriend = async(req,res) => {
    if (user_id != 0) {
        res.render('addFriend.ejs')
    }else{
        res.redirect('/login')
    }
    
}
export const home = (req,res) => {
    res.render('home.ejs')
}
export const login = (req,res) => {
    res.render('login.ejs')
}

export let interfaz = async(req,res) => {
    if (user_id != 0) {
        let [rows] = await pool.query('SELECT * FROM auth_friends')
        let [users] = await pool.query('SELECT * FROM auth_user')
        res.render('interface.ejs' , {rows , name_user , user_id ,users , msj_json})
    }else{
        res.redirect('/login')
    }
}
export const createP = (req,res) => {
    res.render('createP.ejs')                            
}

// // CLOSE SPACE RUTS RENDER

export let register = async (req, res) => {
    const {user, email , pass} = req.body

    try{
        await pool.query('INSERT INTO auth_user(name_user , name_email , pass) VALUES (?, ? , ?)' , [user , email , pass])
        res.redirect('/login')
    }catch (error){
        res.redirect('/init')
    } 
}

export const loginSpace = async(req,res) => {
    msj_json = []

    let {user, pass} = req.body
    try{
        let [rows] = await pool.query('SELECT * FROM auth_user WHERE pass = ? AND name_user = ?' , [pass , user])
        
        if (rows.length == 0) { 
            res.redirect('/login')
        }else{
            res.redirect('/interface')
            console.log(rows)
            user_id = rows[0].user_id
            name_user = rows[0].name_user
        }
    }catch (error) {
        
        res.redirect('/login')
    }
}

export const createProduct = async (req,res) => {
    let {p_name,p_description,p_category,p_cost} = req.body
    try{
        await pool.query('INSERT INTO auth_products (user_id , product_nombre , product_description , product_categoria , product_precio) VALUES ( ? , ? ,? ,? , ?)' , [user_id , p_name,p_description,p_category,p_cost])
        res.redirect('/interface')
    }catch (error){
        console.log(error)
        res.redirect('/createP')
    }    
}
// * ESTA FUNCION AGREGA AMIGOS.
export const addF = async(req , res) => {
    if(user_id != 0){
        let {user , mail} = req.body 
        let [rows] = await pool.query('SELECT * FROM auth_user WHERE name_user = ? AND name_email = ?' , [user, mail])
        if(rows.length == 0){
            res.redirect('/addFriend')
            console.log('No se ha encontrado a ningun usuario')
        }else{
            console.log('Se encontrado')
            let f_id = rows[0].user_id
            await pool.query('INSERT INTO auth_friends (user_id , fri_id) VALUES (? , ?)' , [user_id , f_id])
            res.redirect('/interface')
        }
    }else{
        res.redirect('/login')
    }   
}
// todo: Aqui esta la funcion para poder enviar mensajes

export const msjF = async (req,res) => {
    if (user_id != 0) {
        let {msj} = req.body
        try{
            if (msj != '') {
                await pool.query('INSERT INTO auth_messages(msj_text , user_id , d_id , msj_made) VALUES (?,?,?,?)' , [msj , user_id , id__ , user_id])
                let [rows] = await pool.query('SELECT * FROM auth_messages WHERE user_id = ? and d_id = ? OR user_id = ? and d_id = ?', [user_id , id__ , id__ , user_id])
                msj_json = rows
            }
        }catch(error){
            console.log(error)
        }
        res.redirect('/interface')
    }else{
        res.redirect('/login')
    }
}

// * esta funcin obtiene el id al usuario que va hacer enviado el msj
export const getIdUser = async(req,res) => {
    id__ = req.params.id
    console.log(id__)

    // ! aqui esta la funcion para hacer filtro de los mensajes de cada usuario

    let [rows] = await pool.query('SELECT * FROM auth_messages WHERE user_id = ? and d_id = ? OR user_id = ? and d_id = ?', [user_id , id__ , id__ , user_id])
    console.log(rows)

    msj_json = rows

    res.redirect('/interface')
}
export const closeSvent = (req,res) => {
    msj_json = []
    res.redirect('/interface')
}