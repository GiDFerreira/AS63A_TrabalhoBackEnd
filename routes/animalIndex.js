const express = require('express');
const router = express.Router();
const AnimalService = require('../model/animal');

// SAVE
router.post('/animais', async (req, res) => {
  try {
    const novoAnimal = await AnimalService.criarAnimal(req.body);
    res.json({ animal: novoAnimal });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar animal', erro: error.message });
  }
});

// GET) Listagem geral
router.get('/animais', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 10; 
    const pagina = parseInt(req.query.pagina) || 1; 

    const listaAnimais = await AnimalService.listarAnimais(limite, pagina);
    res.json({ animais: listaAnimais });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar animais', erro: error.message });
  }
});

// GET) Find by id
router.get('/animais/:id', async (req, res) => {
  try {
    const animal = await AnimalService.encontrarAnimal(req.params.id);
    if (animal) {
      res.json({ animal: animal });
    } else {
      res.status(404).json({ mensagem: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter animal', erro: error.message });
  }
});

// UPDATE
router.put('/animais/:id', async (req, res) => {
  try {
    const animalAtualizado = await AnimalService.atualizarAnimal(req.params.id, req.body);
    if (animalAtualizado) {
      res.json({ animal: animalAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar animal', erro: error.message });
  }
});

// DELETE
router.delete('/animais/:id', async (req, res) => {
  try {
    const animalExcluido = await AnimalService.excluirAnimal(req.params.id);
    if (animalExcluido) {
      res.json({ animal: animalExcluido });
    } else {
      res.status(404).json({ mensagem: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir animal', erro: error.message });
  }
});

module.exports = router;
