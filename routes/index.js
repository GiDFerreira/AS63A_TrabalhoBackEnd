const express = require('express');
const router = express.Router();
const PersonagemService = require('../model/personagem'); // Certifique-se de ajustar o caminho correto

// SAVE
router.post('/personagens', async (req, res) => {
  try {
    const novoPersonagem = await PersonagemService.criarPersonagem(req.body);
    res.json({ personagem: novoPersonagem });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar personagem', erro: error.message });
  }
});

// GET) Listagem geral
router.get('/personagens', async (req, res) => {
  try {
    const listaPersonagens = await PersonagemService.listarPersonagens();
    res.json({ personagens: listaPersonagens });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar personagens', erro: error.message });
  }
});

// GET) Find by id
router.get('/personagens/:id', async (req, res) => {
  try {
    const personagem = await PersonagemService.encontrarPersonagem(req.params.id);
    if (personagem) {
      res.json({ personagem: personagem });
    } else {
      res.status(404).json({ mensagem: 'Personagem não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter personagem', erro: error.message });
  }
});



module.exports = router;
