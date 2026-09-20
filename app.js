import express from "express";
import mongoose from "mongoose"
import Router from "./routes/administradorRoutes.js";
import routerLocacao from "./routes/locacaoRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use(Router);
app.use(routerLocacao);

mongoose.connect("mongodb://127.0.0.1:27017/locacaoGames")

const port = 8080;
app.listen(port,(e) => {
    if(e) console.error("Ocorreu um erro ao iniciar o servidor");
    console.log(`Servidor iniciado http://localhost:${port}`);
    console.log(`Documentação Swagger em http://localhost:${port}/api-docs`);
});