const express = require('express');
const router = express.Router();
const UsuarioService = require('../model/usuario');


//Cadastro de usuários
router.post('/cadastro', async (req, res) => {
    try {
        const { email, senha, adminTrue} = req.body;

        //verifica se os campos obrigatórios estão presentes
        if(!email || !senha){
            return res.status(400).json({ mensagem: 'Email e senha são campos obrigatórios.'});
        }

        const novoUsuario = await UsuarioService.criarUsuario({ email, senha, adminTrue });
        res.json({ usuario: novoUsuario, mensagem: 'Usuário cadastrado com sucesso!' }); //Retorna um JSON com as informações do novo usuário criado.

    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar usuário.', erro: error.message });  
    }

});

router.put('/alterarCadastro/:id', async (req, res) => {
    try{
        const alteraUsuario = await UsuarioService.alterarUsuario(req.params.id, req.body);
        res.json(alteraUsuario);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao alterar usuário cadastrado.'});
    }
});

//Criar admin
router.post('/criarAdmin/:id', async (req, res) => {
    try {
        const { email, senha, adminTrue } = req.body;

        if(!req.user || !req.user.adminTrue) {
            return res.status(403).json({mensagem: 'Permissã negada. Apenas administradores podem criar outros administradores. '});
        }

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email e senha são campos obrigatórios.' });
        }

        // Cria o novo administrador
        const novoAdmin = await UsuarioService.criarUsuario({ email, senha, adminTrue: true });

        res.json({ admin: novoAdmin, mensagem: 'Administrador criado com sucesso!' });
    
    } catch (error) {

        res.status(500).json({ mensagem: 'Não possível criar administrador. ', erro: error.message});

    }
});


//Admin exclusão de usuário normal
router.delete('/deletarUsuario/:id', async (req, res) => {
    try {
        const { id } = req.body;

        //Verifica se o usuário é adm ou não
        if (!req.user || !req.user.adminTrue) {
            return res.status(403).json({ mensagem: 'Você não possui permissão para isso. Apenas administradores podem excluir usuários! '});
        }

        //
        const deleta = await UsuarioService.deletarUsuario(id);

        if (deleta) {
            res.json({ mensagem: 'Usuário foi deletado com sucesso!' });
        } else {
            res.status(404).json({ mensagem: 'Usuário não foi encontrado. Não foi possível concluir a ação.'});
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir usuário.', erro: error.message });
    }
});

module.exports = router;