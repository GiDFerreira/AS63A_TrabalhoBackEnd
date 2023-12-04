const { PersonagemModel } = require('./bd');

const LIMITES_PERMITIDOS = [5, 10, 30];

module.exports = {
    async criarPersonagem(personagemData) {
        const personagem = await PersonagemModel.create(personagemData);
        return personagem;
    },

    async listarPersonagens(limite = 10, pagina = 1) {
    if (!LIMITES_PERMITIDOS.includes(limite)) {
      throw new Error('Limite inválido. Valores permitidos: 5, 10, 30');
    }

    const offset = (pagina - 1) * limite;
    const personagens = await PersonagemModel.findAll({
      limit: limite,
      offset: offset,
    });

        return personagens;
    },

    async encontrarPersonagem(id) {
        const personagem = await PersonagemModel.findByPk(id);
        return personagem;
    },

    async atualizarPersonagem(personagemId, novosDados) {
        const [atualizacoes] = await PersonagemModel.update(novosDados, {
            where: { id: personagemId },
        });

        if (atualizacoes > 0) {
            const personagemAtualizado = await PersonagemModel.findByPk(personagemId);
            return personagemAtualizado;
        }

        return null; 
    },

    async deletarPersonagem(personagemId) {
        const personagemRemovido = await PersonagemModel.destroy({
            where: { id: personagemId }
        });

        return personagemRemovido;
    },

    async mostrarInformacoes(racaPersonagem) {
        const totalPersonagens = await PersonagemModel.count({
            where: {
              raca: racaPersonagem,
            },
        });

        const idadeMaisVelha = await PersonagemModel.max('idade', {
            where: {
              raca: racaPersonagem,
            },
        });
      
          // Consulta para obter a idade mais jovem
        const idadeMaisJovem = await PersonagemModel.min('idade', {
            where: {
              raca: racaPersonagem,
            },
        });

        const informacoesExtras = {
            totalPersonagens: totalPersonagens,
            idadeMaisVelha: idadeMaisVelha,
            idadeMaisJovem: idadeMaisJovem,
        };

        return informacoesExtras;
      
    },

};
