const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {

    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
   data: {
       type: Sequelize.STRING,
       allowNull: false
   }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'tbReceita',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('receita', colunas, opcoes)