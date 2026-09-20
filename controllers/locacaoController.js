import locacaoService from "../services/locacaoService.js";

const createLocacao = async (req, res) => {
    try {
         const {user, games = [], dataLocacao, returnDate, status = "Ativo"} = req.body;

        if (!user) return res.status(400).json({error: "Usuário é obrigatório"});

        const {name = "", email = "", phone = "",address = []} = user;

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if(!cleanName || !cleanEmail) return res.status(400).json({error:"Nome ou E-mail não podem estar vazios"});

        if(!cleanEmail.endsWith("@gmail.com")) return res.status(400).json({error:"Apenas contas E-mail são permitidas"});

        const locacao = await locacaoService.createLocacao(
            {
                name: cleanName,
                email: cleanEmail,
                phone,
                address
            },
            games,
            dataLocacao,
            returnDate,
            status);

        res.status(201).json({message:"Locação criado com sucesso", locacao});
    } catch (error) {
        console.error(error.message);

        if(error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({error:"E-mail já existente"});
        }

        res.status(500).json({error:"Erro interno do servidor"});
    }
}

const showLocacao = async (req, res) => {
    try {
        const idLocacao = req.params.id;

        const locacao = await locacaoService.showLocacao(idLocacao);

        return res.status(200).json({locacao});

    } catch (error) {
        console.error(error.message);
        if (error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "Locação não encontrada"});

        return res.status(500).json({error: "Erro interno do servidor"});
    }
};

const showAllLocacao = async (req, res) => {
    try {
        const locacoes = await locacaoService.showAllLocacao();

        return res.status(200).json({locacoes});
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({error: "Erro interno do servidor"});
    }
}

const deleteLocacao = async (req, res) => {
    try {
        const idLocacao = req.params.id;

        await locacaoService.deleteLocacao(idLocacao);

        return res.status(204).send();

    } catch (error) {
        console.error(error.message);
        if (error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "Locação não encontrada"});

        return res.status(500).json({error: "Erro interno do servidor"});
    }
};

const updateLocacao = async (req, res) => {
    try {
        const idLocacao = req.params.id;

        const {name = "", email = "", phone = "", address = [], games = []} = req.body;

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName || !cleanEmail) return res.status(400).json({error: "Nome ou E-mail não podem estar vazios"});

        if (!cleanEmail.endsWith("@gmail.com")) return res.status(400).json({error: "Apenas contas Gmail são permitidas"});

        await locacaoService.updateLocacao(idLocacao,cleanName,cleanEmail,phone,address, games);

        return res.status(200).json({message: "Locação atualizada com sucesso"});

    } catch (error) {
        console.error(error);

        if (error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "Locação não encontrada"});

        return res.status(500).json({error: "Erro interno do servidor"});
    }
};

export {createLocacao, showLocacao, deleteLocacao, updateLocacao, showAllLocacao};