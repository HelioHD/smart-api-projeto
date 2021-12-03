const TabelaDespesa = require('./tabelaDespesa')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Despesas {
    constructor ({ id, nome, valor, tipo , dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.nome = nome
        this.valor = valor
        this.tipo = tipo
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = await TabelaDespesa.inserir({
            nome: this.nome,
            valor: this.valor,
            tipo: this.tipo
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () {
        const encontrado = await TabelaDespesa.pegarPorId(this.id)
        this.nome = encontrado.nomeDespesa
        this.valor = encontrado.valorDespesa
        this.tipo = encontrado.tpDespesa
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar () {
        await TabelaDespesa.pegarPorId(this.id)
        const campos = ['nome', 'valor', 'tipo']
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

        await TabelaDespesa.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaDespesa.remover(this.id)
    }

    validar () {
        const campos = ['nome', 'valor', 'tipo']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Despesas