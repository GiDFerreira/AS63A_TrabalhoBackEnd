const jwt = require('jsonwebtoken');
const express = require('express');
const autenticacao = require('../helpers/autenticacao');
const router = express.Router();


router.post("/login", autenticacao.verifDados, autenticacao.validacaoAcesso, (req, res) => {
    const { email, senha } = req.body;

    if (email != "" && email == senha) {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ usuario: usuario }, secretKey, { expiresIn: '30 min' });
        res.json({logged: true, token: token});
    } else {
        res.status(403).json({logged: false, mensagem: 'Usuario ou senha inválidos!'});
    }
    
})

router.post("/loginAdmin", autenticacao.verifDados, autenticacao.validaAdmin, (req, res) => {
    const { email, senha } = req.body;

    if (email != "" && email == senha) {
        const adminSecretKey = process.env.ADMIN_SECRET_KEY;
        const token = jwt.sign({ admin: true, usuario: usuario }, adminSecretKey, { expiresIn: '30 min' });
        res.json({ logged: true, token: token });
    } else {
        res.status(403).json({ logged: false, mensagem: 'Usuário ou senha de administrador inválidos!' });
    }
});


module.exports = router;