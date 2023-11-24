const { PersonagemModel } = require('./bd');

module.exports = {
    async criarPersonagem(personagemData) {
        const personagem = await PersonagemModel.create(personagemData);
        return personagem;
    },

    async listarPersonagens() {
        const personagens = await PersonagemModel.findAll();
        return personagens;
    },

    async encontrarPersonagem(id) {
        const personagem = await PersonagemModel.findByPk(id);
        return personagem;
    },

    async atualizarPersonagem() {
        
    }

};
