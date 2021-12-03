class NaoEncontrado extends Error {
    constructor () {
        super('Despesa não foi encontrado!')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado