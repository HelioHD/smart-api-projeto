const ModeloTabelaDespesa = require('../rotas/despesas/modeloTabelaDespesa')
const ModeloTabelaReceita = require('../rotas/receita/modeloTabelaReceita')
const ModeloTabelaCadastroUsuario = require('../rotas/cadastro/modeloTabelaCadastroUsuario')


ModeloTabelaDespesa
    .sync()
    .then(() => console.log('Tabela Despesa criada com sucesso'))
    .catch(console.log)

    ModeloTabelaReceita
    .sync()
    .then(() => console.log('Tabela Receita criada com sucesso'))
    .catch(console.log)

    ModeloTabelaCadastroUsuario
    .sync()
    .then(() => console.log('Tabela de Cadastro criada com sucesso'))
    .catch(console.log)