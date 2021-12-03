const express = require('express')
const roteador = require('./rotas/despesas')
const roteadorR = require('./rotas/receita')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => res.send("Salve"));

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        resposta.status(406)
        resposta.end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)
    proximo()
})


app.use('/api/rotas/despesas', roteador)

app.use((erro, requisicao, resposta, proximo) => {
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type')
    )
    resposta.status(status)
    resposta.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.use('/api/rotas/receita', roteadorR)

app.use((erro, requisicao, resposta, proximo) => {
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
    }

    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type')
    )
    resposta.status(status)
    resposta.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

// 5000 para subir no heroku 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API está funcionando na porta: ${PORT}.`);

});


//app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))
