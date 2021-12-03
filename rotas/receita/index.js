const roteadorR = require('express').Router()
const TabelaReceita = require('./tabelaReceita')
const Saldo = require('./Saldo')
const SerializadorReceitas = require('../../Serializador').SerializadorReceita


roteadorR.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaReceita.listar()
    
    const serializador = new SerializadorReceitas(
        resposta.getHeader('Content-Type')
    )
    return resposta.status(200).send(
        serializador.serializar(resultados)
    )

})
const get = async () => {
    return Promise.reject('Se deu está correto!').catch(err => {
      throw new Error(err);
    });
 };
  
  get()
    .then(console.log)
    .catch(function(e) {
      console.log(e);
    });
    
roteadorR.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const receita = new Saldo(dadosRecebidos)
        await receita.criar()
        resposta.status(201)
        const serializador = new SerializadorReceitas(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(receita)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteadorR.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const saldo = new Saldo({ id: id })
        await saldo.carregar()
        resposta.status(200)
        const serializador = new SerializadorReceitas(
            resposta.getHeader('Content-Type'),
            ['valor', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(saldo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteadorR.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const receita = new Saldo(dados)
        await receita.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteadorR.delete('/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const receita = new Saldo({ id: id })
        await receita.carregar()
        await receita.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteadorR