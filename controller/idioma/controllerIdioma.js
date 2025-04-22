/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de idioma
 * data: 22/04/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const filmeDAO = require('../../model/DAO/idioma.js')


const inserirIdioma = async function(idioma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                idioma.idioma_filme == '' || idioma.idioma_filme == undefined || idioma.idioma_filme == null || idioma.idioma_filme.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultIdioma = await idiomaDAO.insertIdioma(idioma)

                if (resultIdioma)
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

const atualizarIdioma = async function(id, idioma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                idioma.idioma_filme == '' || idioma.idioma_filme == undefined || idioma.idioma_filme == null || idioma.idioma_filme.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

                if (resultIdioma != false || typeof(resultIdioma) == 'object') {
                    if (resultIdioma.length > 0) {
                        idioma.id = parseInt(id)
                        let result = await idiomaDAO.updateIdioma(idioma)

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

const excluirIdioma = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if (resultIdioma != false || typeof(resultIdioma) == 'object') {
                if (resultIdioma.length > 0) {
                    let result = await idiomaDAO.deleteIdioma(parseInt(id))

                    if (result)
                        return message.SUCESS_DELETE_ITEM // 200
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

const listarIdiomas = async function() {
    try {
        let dadosIdiomas = {}
        let resultIdioma = await idiomaDAO.selectAllIdiomas()

        if (resultIdioma != false || typeof(resultIdioma) == 'object') {
            if (resultIdioma.length > 0) {
                dadosIdiomas.status = true
                dadosIdiomas.status_code = 200
                dadosIdiomas.items = resultIdioma.length
                dadosIdiomas.idiomas = resultIdioma

                return dadosIdiomas
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

const buscarIdioma = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosIdioma = {}
            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if (resultIdioma != false || typeof(resultIdioma) == 'object') {
                if (resultIdioma.length > 0) {
                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.idioma = resultIdioma

                    return dadosIdioma
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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdiomas,
    buscarIdioma
}
