/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de nacionalidade
 * data: 22/04/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')


const inserirNacionalidade = async function(nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)
                

                if (result)
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

const atualizarNacionalidade = async function(id, nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultCheck = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

                if (resultCheck != false || typeof(resultCheck) == 'object') {
                    if (resultCheck.length > 0) {
                        nacionalidade.id = parseInt(id)
                        let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

                        if (result)
                            return message.SUCESS_UPDATED_ITEM // 200
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
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

const excluirNacionalidade = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultCheck = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

            if (resultCheck != false || typeof(resultCheck) == 'object') {
                if (resultCheck.length > 0) {
                    let result = await nacionalidadeDAO.deleteNacionalidade(parseInt(id))

                    if (result)
                        return message.SUCESS_DELETED_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
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

const listarNacionalidades = async function() {
    try {
        let dadosNacionalidade = {}
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if (result != false || typeof(result) == 'object') {
            if (result.length > 0) {
                dadosNacionalidade.status = true
                dadosNacionalidade.status_code = 200
                dadosNacionalidade.items = result.length
                dadosNacionalidade.nacionalidades = result

                return dadosNacionalidade
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

const buscarNacionalidade = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosNacionalidade = {}
            let result = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

            if (result != false || typeof(result) == 'object') {
                if (result.length > 0) {
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.nacionalidade = result

                    return dadosNacionalidade
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidades,
    buscarNacionalidade
}