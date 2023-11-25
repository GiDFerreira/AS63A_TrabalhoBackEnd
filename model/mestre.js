const { MestreModel } = require('./bd');

const LIMITES_PERMITIDOS = [5, 10, 30];

module.exports = {
    async criarMestre(personagemData) {
        const mestre = await MestreModel.create(mestreData);
        return mestre;
    },

    async listarMestres(limite = 10, pagina = 1) {
        if (!LIMITES_PERMITIDOS.includes(limite)) {
          throw new Error('Limite inválido. Valores permitidos: 5, 10, 30');
        }

        const offset = (pagina - 1) * limite;
        const mestres = await MestreModel.findAll({
        limit: limite,
        offset: offset,
        });

        return mestres;
    },

    async encontrarMestre(id) {
        const mestre = await MestreModel.findByPk(id);
        return mestre;
    },

    async atualizarMestre(mestreId, novosDados) {
        const [atualizacoes] = await MestreModel.update(novosDados, {
            where: { id: mestreId },
        });

        if (atualizacoes > 0) {
            const mestreAtualizado = await PersonagemModel.findByPk(mestreId);
            return mestreAtualizado;
        }

        return null; 
    },

    async excluirMestre(mestreId) {
        const MestreRemovido = await MestreModel.destroy(mestreId, {
            where: {id : mestreId}
        });

        return MestreRemovido;
    }

}