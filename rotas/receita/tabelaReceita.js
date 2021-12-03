const Modelo = require('./modeloTabelaReceita')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
   async listar () {
        return await Modelo.findAll({ raw: true })
    },
    inserir (despesa) {
        return Modelo.create(despesa)
    },
    async pegarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },
    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    remover (id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }
}