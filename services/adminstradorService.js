import Administrador from "../models/adminstradorModel.js";

class AdministradorService {
    async createAdministrador(name, email, password) {

        const emailexists = await Administrador.findOne({email});

        if (emailexists) throw new Error("EMAIL_EXISTS");

        await Administrador.create({name, email, password});
    }

    async showAdministrador(id) {

        const administrador = await Administrador.findById(id).select("-password");

        if (!administrador) throw new Error("ID_NOT_EXISTS");

        return administrador;
    }

    async deleteAdministrador(id) {

        const administrador = await Administrador.findByIdAndDelete(id);

        if (!administrador) throw new Error("ID_NOT_EXISTS");

        return administrador;
    }

    async updateAdministrador(id, name, email, password) {

        if (!password) {
            const update = await Administrador.findByIdAndUpdate(id,
                {
                    name,
                    email
                },
                {
                    new: true
                }
            );

            if (!update) throw new Error("ID_NOT_EXISTS");

            return update;
        }

        const update = await Administrador.findByIdAndUpdate(id,
            {
                name,
                email,
                password
            },
            {
                new: true
            }
        );

        if (!update) throw new Error("ID_NOT_EXISTS");

        return update;
    }
}

export default new AdministradorService();