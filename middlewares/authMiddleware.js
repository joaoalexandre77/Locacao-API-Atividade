import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({error: "Token não informado"});

    const parts = authHeader.split(' ');
    if(parts.length != 2 || parts[0] != 'Bearer') {
        return res.status(401).json({error: "Formato de Token inválido"});
    }

    const token = parts[1];
    const secretKey = "dsfsdfkl234gkrwepotk34";

    try {
        const decoded = jwt.verify(token, secretKey);

        req.administradorId = decoded.id;
        
        return next();
    } catch (error) {
        return res.status(401).json({error: "Token invalido ou expirado"});
    }
}

export default authMiddleware;