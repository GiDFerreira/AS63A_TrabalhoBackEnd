const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email != "" && email == senha) {
        const token = jwt.sign({usuario: usuario}, '123!@#', {expiresIn: '10 min'});
        res.json({logged: true, token: token});
    } else {
        res.status(403).json({logged: false, mensagem: 'Usuario ou senha inválidos!'});
    }
    
})

module.exports = router;