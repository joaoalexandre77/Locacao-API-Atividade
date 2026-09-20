import administradorService from "../services/adminstradorService.js"
import { createHash } from "../services/argon2.js";

const createAdministrador = async (req, res) => {
    try {

        const {name = "", email = "", password = ""} = req.body;

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if(!cleanName || !cleanEmail) return res.status(400).json({error: "Nome ou E-mail não podem estar vazios"});

        if(!cleanEmail.endsWith("@gmail.com")) return res.status(400).json({error: "Apenas contas E-mail são permitidas"});

        if(!password) return res.status(400).json({error: "A senha não pode ser vazia"});

        if(/\s/.test(password)) return res.status(400).json({error: "A senha não pode conter espaços"});

        const passwordHash = await createHash(password);

        await administradorService.createAdministrador(
            cleanName,
            cleanEmail,
            passwordHash
        );

        res.status(201).json({message: "Administrador criado com sucesso"});

    } catch (error) {
        console.error(error.message);

        if(error.message === "EMAIL_EXISTS") return res.status(409).json({error: "E-mail já existente"});

        res.status(500).json({error: "Erro interno do servidor"});
    }
};


const showAdministrador = async (req, res) => {
    try {
        const id = req.administradorId;

        const administrador = await administradorService.showAdministrador(id);

        res.status(200).json({administrador});

    } catch (error) {
        console.error(error.message);

        if(error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "ID não existe"});

        res.status(500).json({error: "Erro interno do servidor"});
    }
};


const deleteAdministrador = async (req, res) => {
    try {
        const id = req.administradorId;

        await administradorService.deleteAdministrador(id);

        return res.status(204).send();

    } catch (error) {
        console.error(error.message);

        if(error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "ID não existe"});

        res.status(500).json({error: "Erro interno do servidor"});
    }
};


const updateAdministrador = async (req, res) => {
    try {
        const {name = "", email = "", password} = req.body;

        const id = req.administradorId;

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if(!cleanName || !cleanEmail) return res.status(400).json({error: "Nome ou E-mail não podem estar vazios"});

        if(password) {
            if(/\s/.test(password)) return res.status(400).json({error: "A senha não pode conter espaços"});
        }

        if(!password) { 
            await administradorService.updateAdministrador(id, cleanName, cleanEmail);

            return res.status(200).json({message: "Administrador atualizado com sucesso"});
        }

        const hashPassword = await createHash(password);

        await administradorService.updateAdministrador(id, cleanName, cleanEmail, hashPassword);

        return res.status(200).json({message: "Administrador atualizado com sucesso"});

    } catch (error) {
        console.error(error.message);

        if(error.message === "ID_NOT_EXISTS") return res.status(404).json({error: "ID não existe"});

        res.status(500).json({error: "Erro interno do servidor"});
    }
};


export {createAdministrador, showAdministrador, deleteAdministrador, updateAdministrador};