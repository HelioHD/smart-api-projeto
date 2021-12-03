const roteador = require('express').Router()
const TabelaDespesa = require('./tabelaDespesa')
const Despesa = require('./Despesas')
const SerializadorDespesas = require('../../Serializador').SerializadorDespesas


roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaDespesa.listar()
    
    const serializador = new SerializadorDespesas(
        resposta.getHeader('Content-Type')
    )
    return resposta.status(200).send(
        serializador.serializar(resultados)
    )

})
const get = async () => {
    return Promise.reject('Se deu está correto').catch(err => {
      throw new Error(err);
    });
  };
  
  get()
    .then(console.log)
    .catch(function(e) {
      console.log(e);
    });
    
roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const despesa = new Despesa(dadosRecebidos)
        await despesa.criar()
        resposta.status(201)
        const serializador = new SerializadorDespesas(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(despesa)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const despesa = new Despesa({ id: id })
        await despesa.carregar()
        resposta.status(200)
        const serializador = new SerializadorDespesas(
            resposta.getHeader('Content-Type'),
            ['nome', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(despesa)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const despesa = new Despesa(dados)
        await despesa.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const despesa = new Despesa({ id: id })
        await despesa.carregar()
        await despesa.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador