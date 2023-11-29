const express = require('express');
const router = express.Router();
const JogadorService = require('../model/jogador');

// SAVE
router.post('/jogadores', async (req, res) => {
  try {
    const novoJogador = await JogadorService.criarJogador(req.body);
    res.json({ jogador: novoJogador });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar jogador', erro: error.message });
  }
});

// GET) Listagem geral
router.get('/jogadores', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 10; 
    const pagina = parseInt(req.query.pagina) || 1; 

    const listaJogadores = await JogadorService.listarJogadores(limite, pagina);
    res.json({ jogadores: listaJogadores });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar personagens', erro: error.message });
  }
});

// GET) Find by id
router.get('/jogadores/:id', async (req, res) => {
  try {
    const jogador = await JogadorService.encontrarJogador(req.params.id);
    if (jogador) {
      res.json({ jogador: jogador });
    } else {
      res.status(404).json({ mensagem: 'Jogador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter jogador', erro: error.message });
  }
});

// UPDATE
router.put('/jogadores/:id', async (req, res) => {
  try {
    const jogadorAtualizado = await JogadorService.atualizarJogador(req.params.id, req.body);
    if (jogadorAtualizado) {
      res.json({ jogador: jogadorAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Jogador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar jogador', erro: error.message });
  }
});

// DELETE
router.delete('/jogadores/:id', async (req, res) => {
  try {
    const jogadorExcluido = await JogadorService.excluirJogador(req.params.id);
    if (jogadorExcluido) {
      res.json({ jogador: jogadorExcluido });
    } else {
      res.status(404).json({ mensagem: 'Jogador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir jogador', erro: error.message });
  }
});

module.exports = router;
