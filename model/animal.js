const { AnimalModel } = require('./bd');

const LIMITES_PERMITIDOS = [5, 10, 30];

module.exports = {
    async criarAnimal(animalData) {
        const animal = await AnimalModel.create(animalData);
        return animal;
    },

    async listarAnimais(limite = 10, pagina = 1) {
        if (!LIMITES_PERMITIDOS.includes(limite)) {
          throw new Error('Limite inválido. Valores permitidos: 5, 10, 30');
        }

        const offset = (pagina - 1) * limite;
        const animais = await AnimalModel.findAll({
        limit: limite,
        offset: offset,
        });

        return animais;
    },

    async encontrarAnimal(id) {
        const animal = await AnimalModel.findByPk(id);
        return animal;
    },

    async atualizarAnimal(animalId, novosDados) {
        const [atualizacoes] = await AnimalModel.update(novosDados, {
            where: { id: animalId },
        });

        if (atualizacoes > 0) {
            const animalAtualizado = await AnimalModel.findByPk(animalId);
            return animalAtualizado;
        }

        return null; 
    },

    async excluirAnimal(animalId) {
        const animalRemovido = await AnimalModel.destroy({
            where: {id : animalId}
        });

        return animalRemovido;
    }

}
