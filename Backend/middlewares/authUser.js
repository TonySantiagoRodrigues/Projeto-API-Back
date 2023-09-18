const jwt = require('jsonwebtoken');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function authUser(req, res, next) {
    const token = req.headers['x-auth-token'];

    if (!token) {
        return tratarErrosEsperados(res, new Error("Token de autenticação não fornecido"));
    }

    // Verifique se a variável de ambiente JWT_SECRET está definida
    if (!process.env.JWT_SECRET) {
        return tratarErrosEsperados(res, new Error("Chave secreta JWT não está definida"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuarioJwt = decoded;

        next();
    } catch (error) {
        console.error(error);
        return tratarErrosEsperados(res, new Error("Token de autenticação inválido"));
    }
}

module.exports = authUser;
