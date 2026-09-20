import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Administrador from "../models/adminstradorModel.js";

class AuthService {
    async login(email, password) {
        const user = await Administrador.findOne({email});

        if(!user) throw new Error("INVALID_CREDENTIAL");

        const isValidPassword = await argon2.verify(user.password, password);

        if(!isValidPassword) throw new Error("INVALID_CREDENTIAL");
        
        const secretKey = "dsfsdfkl234gkrwepotk34";

        const token = jwt.sign(
            {id: user._id, email: user.email},
            secretKey,
            {expiresIn: '1d'}
        );

        return {token, user: {id: user._id, name: user.name, email: user.email}};
    }
}

export default new AuthService;