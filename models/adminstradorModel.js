import mongoose from "mongoose";

const administradorSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Administrador = mongoose.model('Adminstrador', administradorSchema);

export default Administrador;