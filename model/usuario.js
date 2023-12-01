const { UsuarioModel } = require('./bd');

module.exports = {
    async criarUsuario(UsuarioData) {
        const usuario = await UsuarioModel.create(UsuarioData);
        return usuario;
    },

    //Criar rota específica para alterar os dados do usuário
    async alterarUsuario(AlteraData, id){
        const [linhasAlteradas, [altera]] = await UsuarioModel.update(AlteraData, {
            where: { id },
            returning: true, //Retorna os registros alterados
        });

        if (linhasAlteradas > 0) {
            return altera;
        } else {
            throw new Error('Usuário não encontrado ou nada alterado.');
        }
    }
};