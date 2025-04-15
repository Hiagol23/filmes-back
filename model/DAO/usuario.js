/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de idiomas
* data: 15/04/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

//Inserir um novo genero
const insertUsuario = async function(usuario) {

    try {

        let sql = `insert into tbl_usuario ( nome_usuario,
                                            email
                                            )
                
                                            values
                                            '${usuario.nome_usuario}',
                                            '${usuario.email}'
                                            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }

}

//Atualizar usuario
const updateUsuario = async function (usuario){
    try {
        let sql = `updape tbl_usuario set   nome_usuario = '${usuario.nome_usuario}',
                                            email = '${usuario.email}'
                                where id = ${usuario.id}            
                                `

        let resultUsuario = await prisma.$executeRawUnsafe(sql)

        if(resultUsuario)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Excluir usuario
const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

//Retornar todos os usuarios
const selectAllUsuario = async function () {
    
    try {
        let sql = 'select * from tbl_usuario order by id desc'

        let result = await prisma.$queryRawUnsafe (sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Buscar usuario pelo id
const selectByIdUsuario = async function(id) {
    try {
        let sql = `select * from tbl_usuario where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}