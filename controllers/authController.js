import AuthService from "../services/authService.js";

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "E-mail e senha não podem estar vazios"});
        }

        const data = await AuthService.login(email, password);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error)
        if(error.message === "INVALID_CREDENTIAL") {
            return res.status(401).json({error: "E-mail ou senha invalidos"});
        }
        res.status(500).json({error: "Erro interno no servidor"});
    }
}

export default login;