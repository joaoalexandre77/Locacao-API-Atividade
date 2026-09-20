import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    street: String,
    number: Number,
    neighborhood: String,
    city: String,
    state: String,
    zipCode: String
})

const usuarioSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: [addressSchema]
});

const gameSchema = mongoose.Schema({
    name: String,
    year: String,
    price: String,
    quantity: Number
});

const locacaoSchema = mongoose.Schema({
    user: usuarioSchema,
    games: [gameSchema],
    dataLocacao: Date,
    returnDate: Date,
    status: {
        type: String,
        enum: ["Ativo", "inativo"]
    }
});

const Locacao = mongoose.model('Locacao', locacaoSchema);

export default Locacao;