const express = require('express');
const router = express.Router();
const JogadorService = require('../model/jogador');
const autenticacao = require('../helpers/autenticacao');

// rota install
const {sequelize} = require('../model/bd')
const PersonagemService = require('../model/personagem');
const AnimalService = require('../model/animal');
const UsuarioService = require('../model/usuario');



//Install
router.get('/install', async function(req, res, next) {
  try {
    await sequelize.sync({ force: true });

    let jogador = await JogadorService.criarJogador({
      nome: "Helena Campos",
      experiencia: "Pouca",
    });
    

    let personagem = await PersonagemService.criarPersonagem({
      nome: "Eldana",
      idade: "123",
      raca: "Elfo",
      classe: "Mago",
      nivel: "5",
      habilidadeEspecial: "Magia acarna",
    });

    let animal = await AnimalService.criarAnimal({
      nome: "Filó, a toupeira",
      vida: "12",
    });

    let usuario = await UsuarioService.criarUsuario({
      email: "HelenaC@email.com",
      senha: "lelena123",
      adminTrue: true,
    });

    //Rogério Borges
    let jogador1 = await JogadorService.criarJogador({
      nome: "Rogério Borges",
      experiencia: "Expert",
    });
    
    let personagem1 = await PersonagemService.criarPersonagem({
      nome: "Ton, o Grande",
      idade: "30",
      raca: "Halfling",
      classe: "Ladino",
      nivel: "7",
      habilidadeEspecial: "Astúcia Ladina",
    });
    
    let usuario1 = await UsuarioService.criarUsuario({
      email: "RogérioB@email.com",
      senha: "rogerio123",
      adminTrue: false,
    });
    
    //João Vitor Lombardo
    let jogador2 = await JogadorService.criarJogador({
      nome: "João Vitor Lombardo",
      experiencia: "Pouca",
    });
    
    let personagem2 = await PersonagemService.criarPersonagem({
      nome: "Lorenzo, o Sábio",
      idade: "42",
      raca: "Humano",
      classe: "Mago",
      nivel: "10",
      habilidadeEspecial: "Conhecimento Arcano",
    });
    
    let usuario2 = await UsuarioService.criarUsuario({
      email: "JoaoL@email.com",
      senha: "joao123",
      adminTrue: false,
    });
    
    //Gabriella Robson
    let jogador3 = await JogadorService.criarJogador({
      nome: "Gabriella Robson",
      experiencia: "Aventureira",
    });
    
    let personagem3 = await PersonagemService.criarPersonagem({
      nome: "Drakar, a Flamejante",
      idade: "25",
      raca: "Draconato",
      classe: "Paladino",
      nivel: "8",
      habilidadeEspecial: "Sopro de Fogo Divino",
    });
    
    let usuario3 = await UsuarioService.criarUsuario({
      email: "GabriellaR@email.com",
      senha: "gabriella123",
      adminTrue: true,
    });
    
    //Breno Alencar
    let jogador4 = await JogadorService.criarJogador({
      nome: "Breno Alencar",
      experiencia: "Aventureiro",
    });
    
    let personagem4 = await PersonagemService.criarPersonagem({
      nome: "Goruk, o Destemido",
      idade: "28",
      raca: "Anão",
      classe: "Guerreiro",
      nivel: "6",
      habilidadeEspecial: "Força Destruidora",
    });
    
    let animal4 = await AnimalService.criarAnimal({
      nome: "Rufus, o Lobo",
      vida: "18",
    });
    
    let usuario4 = await UsuarioService.criarUsuario({
      email: "BrenoA@email.com",
      senha: "breno123",
      adminTrue: false,
    });

    res.json({ mensagem: "Instalado com sucesso!!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro durante a instalação." });
  }
});

// SAVE
router.post('/jogadores', autenticacao.validacaoAcesso, async (req, res) => {
  try {
    const novoJogador = await JogadorService.criarJogador(req.body);
    res.json({ jogador: novoJogador });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar jogador', erro: error.message });
  }
});

// GET) Listagem geral
router.get('/jogadores', autenticacao.validacaoAcesso, async (req, res) => {
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
router.get('/jogadores/:id', autenticacao.validacaoAcesso, async (req, res) => {
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
router.put('/jogadores/:id', autenticacao.validacaoAcesso, async (req, res) => {
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
router.delete('/jogadores/:id', autenticacao.validacaoAcesso, async (req, res) => {
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
