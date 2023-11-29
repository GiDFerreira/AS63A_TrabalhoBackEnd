const express = require('express');
const router = express.Router();
const MestreService = require('../model/mestre');

// SAVE
router.post('/mestres', async (req, res) => {
  try {
    const novoMestre = await MestreService.criarMestre(req.body);
    res.json({ mestre: novoMestre });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar mestre', erro: error.message });
  }
});

// GET) Listagem geral
router.get('/mestres', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 10; 
    const pagina = parseInt(req.query.pagina) || 1; 

    const listaMestres = await MestreService.listarMestres(limite, pagina);
    res.json({ mestres: listaMestres });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar mestres', erro: error.message });
  }
});

// GET) Find by id
router.get('/mestres/:id', async (req, res) => {
  try {
    const mestre = await MestreService.encontrarMestre(req.params.id);
    if (mestre) {
      res.json({ mestre: mestre });
    } else {
      res.status(404).json({ mensagem: 'Mestre não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter mestre', erro: error.message });
  }
});

// UPDATE
router.put('/mestres/:id', async (req, res) => {
  try {
    const mestreAtualizado = await MestreService.atualizarMestre(req.params.id, req.body);
    if (mestreAtualizado) {
      res.json({ mestre: mestreAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Mestre não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar mestre', erro: error.message });
  }
});

// DELETE
router.delete('/mestres/:id', async (req, res) => {
  try {
    const mestreExcluido = await MestreService.excluirMestre(req.params.id);
    if (mestreExcluido) {
      res.json({ mestre: mestreExcluido });
    } else {
      res.status(404).json({ mensagem: 'Personagem não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir personagem', erro: error.message });
  }
});

module.exports = router;
