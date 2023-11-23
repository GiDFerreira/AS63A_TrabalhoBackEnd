const {PersonagemModel} = require('./bd')

module.exports = {
    novo: async (nome) => {
        return await PersonagemModel.create({nome: nome})
    }
    
}