const jwt = require('jsonwebtoken');

module.exports = {
    validacaoAcesso: (req, res, next) => {
        const userToken = req.headers['Autorizacao'] || " ";
        const token = userToken && userToken.split(" ")[1];

        if (!userToken) {
            return res.status(401).json({ mensagem: 'Token não inserido' });
        }
        
        if (!token) {
            return res.status(401).json({ mensagem: 'Você não tem permissão'});
        }
        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } catch (error) {
            res.status(400).json({ mensagem: 'Token inválido!'});
        }
    },

    validaAdmin: (req, res, next) => {
        const adminToken = req.headers['autorizacao'] || " ";
        const token = userToken && userToken.split(" ")[1];

        if (!adminToken) {
            return res.status(401).json({ mensagem: 'Token não inserido' });
        }
        
        if (!token) {
            return res.status(401).json({ mensagem: 'Você não tem permissão'});
        }
        try {
            const secret = process.env.SECRET;
            const decoded = jwt.verify(token, secret);
            if (!decoded.admin) {
                res.status(400).json({ msg: 'Você não é administrador'});
            } else {
                next();
            }
        } catch (error) {
            res.status(400).json({ msg: 'Token inválido!'});
        }
    },

    verifDados(req, res, next){
        const { email, senha } = req.body;
        if (!email) {
            return res.status(422).json({ msg: 'Error: digite seu email'});
        }
        if (!senha) {
            return res.status(422).json({ msg: 'Error: digite sua senha'});
        }
        next();
    }
};
