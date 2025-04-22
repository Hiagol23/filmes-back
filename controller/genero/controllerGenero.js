/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 22/04/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const generoDAO = require('../../model/DAO/genero.js')


const inserirGenero = async function(genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (genero.genero == '' || genero.genero == undefined || genero.genero == null || genero.genero.length > 45) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultGenero = await generoDAO.insertGenero(genero)

                if (resultGenero)
                    return message.SUCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const atualizarGenero = async function(id, genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                genero.genero == '' || genero.genero == undefined || genero.genero == null || genero.genero.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

                if (resultGenero != false || typeof(resultGenero) == 'object') {
                    if (resultGenero.length > 0) {
                        genero.id = parseInt(id)
                        let result = await generoDAO.updateGenero(genero)

                        if (result) {
                            return message.SUCESS_UPDATED_ITEM // 200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const excluirGenero = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if (resultGenero != false || typeof(resultGenero) == 'object') {
                if (resultGenero.length > 0) {
                    let result = await generoDAO.deleteGenero(parseInt(id))

                    if (result) {
                        return message.SUCESS_DELETED_ITEM // 200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listarGeneros = async function() {
    try {
        let dadosGeneros = {}
        let resultGenero = await generoDAO.selectAllGenero()

        if (resultGenero != false || typeof(resultGenero) == 'object') {
            if (resultGenero.length > 0) {
                dadosGeneros.status = true
                dadosGeneros.status_code = 200
                dadosGeneros.items = resultGenero.length
                dadosGeneros.generos = resultGenero

                return dadosGeneros
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarGenero = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosGenero = {}

            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if (resultGenero != false || typeof(resultGenero) == 'object') {
                if (resultGenero.length > 0) {
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = resultGenero

                    return dadosGenero
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGenero
}
