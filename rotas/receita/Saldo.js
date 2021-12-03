const TabelaReceita = require('./tabelaReceita')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Despesas {
    constructor ({ id, valor, data, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.valor = valor
        this.data = data
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = await TabelaReceita.inserir({
            valor: this.valor,
            data: this.data
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () {
        const encontrado = await TabelaReceita.pegarPorId(this.id)
        this.valor = encontrado.valorReceita
        this.data = encontrado.dataReceita
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar () {
        await TabelaReceita.pegarPorId(this.id)
        const campos = ['valor', 'data']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaReceita.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaReceita.remover(this.id)
    }

    validar () {
        const campos = ['valor', 'data']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Despesas