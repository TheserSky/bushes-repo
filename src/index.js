//Importaciones necesarias
import app from "./app.js";
import morgan from "morgan";
import router from "./router/router.js";
import express from "express";
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended: false}))
app.use(express.json());
//middlewares
app.use(morgan("dev"))
app.use(router)

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))

app.use(express.static(app.get('views')))

//settings
app.set('port', 3000)

//setting

//Configuracion del servidor
app.listen(app.get('port') , () => {
    console.log('Server on port' , app.get('port'))
})