/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de usuario
 * data: 22/04/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const filmeDAO = require('../../model/DAO/usuario.js')


const inserirUsuario = async function(usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                usuario.nome_usuario == '' || usuario.nome_usuario == undefined || usuario.nome_usuario == null || usuario.nome_usuario.length > 100 ||
                usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if (resultUsuario)
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

const atualizarUsuario = async function(id, usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                usuario.nome_usuario == '' || usuario.nome_usuario == undefined || usuario.nome_usuario == null || usuario.nome_usuario.length > 100 ||
                usuario.email == '' || usuario.email == undefined || usuario.email == null || usuario.email.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

                if (resultUsuario != false || typeof(resultUsuario) == 'object') {
                    if (resultUsuario.length > 0) {
                        usuario.id = parseInt(id)
                        let result = await usuarioDAO.updateUsuario(usuario)

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

const excluirUsuario = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if (resultUsuario != false || typeof(resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    let result = await usuarioDAO.deleteUsuario(parseInt(id))

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

const listarUsuarios = async function() {
    try {
        let dadosUsuarios = {}
        let resultUsuario = await usuarioDAO.selectAllUsuarios()

        if (resultUsuario != false || typeof(resultUsuario) == 'object') {
            if (resultUsuario.length > 0) {
                dadosUsuarios.status = true
                dadosUsuarios.status_code = 200
                dadosUsuarios.items = resultUsuario.length
                dadosUsuarios.usuarios = resultUsuario

                return dadosUsuarios
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

const buscarUsuario = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if (resultUsuario != false || typeof(resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    dadosUsuario.usuario = resultUsuario

                    return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario
}
