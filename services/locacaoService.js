import Locacao from "../models/locacaoModel.js";

class locacaoService{
    async createLocacao(user, games, dataLocacao, returnDate, status) {
        const emailexists = await Locacao.findOne({"user.email": user.email});

        if(emailexists) throw new Error("EMAIL_EXISTS");
            
        const locacao = await Locacao.create({user, games, dataLocacao, returnDate, status});

        return locacao;
    }

    async showLocacao(id) {
        const locacao = await Locacao.findById(id);

        if (!locacao) throw new Error("ID_NOT_EXISTS");

        return locacao;
    }

    async showAllLocacao() {
        const locacoes = await Locacao.find();

        return locacoes;
    }

    async deleteLocacao(id) {
        const locacao = await Locacao.findByIdAndDelete(id);

        if (!locacao) throw new Error("ID_NOT_EXISTS");

        return locacao;
    }

    async updateLocacao(id, name, email, phone, address, games) {
        const update = await Locacao.findByIdAndUpdate(id,
            {
                user: {
                    name,
                    email,
                    phone,
                    address
                },
                games
            },
            {
                new: true
            }
        );
        if (!update) throw new Error("ID_NOT_EXISTS");

        return update;
    }
}
    
export default new locacaoService();