const { JogadorModel } = require('./bd');

const LIMITES_PERMITIDOS = [5, 10, 30];

module.exports = {
    async criarJogador(jogadorData) {
        const jogador = await JogadorModel.create(jogadorData);
        return jogador;
    },

    async listarJogadores(limite = 10, pagina = 1) {
        if (!LIMITES_PERMITIDOS.includes(limite)) {
          throw new Error('Limite inválido. Valores permitidos: 5, 10, 30');
        }

        const offset = (pagina - 1) * limite;
        const jogadores = await JogadorModel.findAll({
        limit: limite,
        offset: offset,
        });

        return jogadores;
    },

    async encontrarJogador(id) {
        const jogador = await JogadorModel.findByPk(id);
        return jogador;
    },

    async atualizarJogador(jogadorId, novosDados) {
        const [atualizacoes] = await JogadorModel.update(novosDados, {
            where: { id: jogadorId },
        });

        if (atualizacoes > 0) {
            const jogadorAtualizado = await JogadorModel.findByPk(jogadorId);
            return jogadorAtualizado;
        }

        return null; 
    },

    async excluirJogador(jogadorId) {
        const jogadorRemovido = await JogadorModel.destroy({
            where: {id : jogadorId}
        });

        return jogadorRemovido;
    }

}