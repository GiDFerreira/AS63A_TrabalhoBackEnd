const express = require('express');
const router = express.Router();
const PersonagemService = require('../model/personagem');

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
    const limite = parseInt(req.query.limite) || 10; 
    const pagina = parseInt(req.query.pagina) || 1; 

    const listaPersonagens = await PersonagemService.listarPersonagens(limite, pagina);
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

// UPDATE
router.put('/personagens/:id', async (req, res) => {
  try {
    const personagemAtualizado = await PersonagemService.atualizarPersonagem(req.params.id, req.body);
    if (personagemAtualizado) {
      res.json({ personagem: personagemAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Personagem não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar personagem', erro: error.message });
  }
});

// DELETE
router.delete('/personagens/:id', async (req, res) => {
  try {
    const personagemExcluido = await PersonagemService.deletarPersonagem(req.params.id);
    if (personagemExcluido) {
      res.json({ personagem: personagemExcluido });
    } else {
      res.status(404).json({ mensagem: 'Personagem não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir personagem', erro: error.message });
  }
});

// OPERAÇÃO ESPECIAL
router.get('personagens/:idade/:raca/:nivel', async (req, res) => {
  try {
    const {idade, raca, nivel} = req.params;
    const personagens = await PersonagemModel.findAll({
      where: {
        idade: {
          [Sequelize.Op.gte]: idade,
        },
        raca: raca,
        nivel: {
          [Sequelize.Op.gte]: nivel,
        },
      },
    });

    res.json(personagens);

  } catch {
    console.error('Erro ao buscar personagens:', error);
    res.status(500).send('Erro interno do servidor');
  }
  
});

module.exports = router;
