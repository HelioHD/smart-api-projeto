const ModeloTabelaDespesa = require('../rotas/despesas/modeloTabelaDespesa')
const ModeloTabelaReceita = require('../rotas/receita/modeloTabelaReceita')



ModeloTabelaDespesa
    .sync()
    .then(() => console.log('Tabela Despesa criada com sucesso'))
    .catch(console.log)

    ModeloTabelaReceita
    .sync()
    .then(() => console.log('Tabela Receita criada com sucesso'))
    .catch(console.log)

  
