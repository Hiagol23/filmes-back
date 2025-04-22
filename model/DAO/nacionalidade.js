/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de idiomas
* data: 15/04/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

//Inserir uma nova nacionalidade
const insertNacionalidade = async function(nacionalidade){

    try {

        let sql = `insert into tbl_nacionalidade ( nacionalidade
                                            )

                                            values
                                            (
                                            '${nacionalidade.nacionalidade}'
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

//Atualizar nacionalidade
const updateNacionalidade = async function (nacionalidade) {
    try {
        let sql = `update tbl_nacionalidade set    nacionalidade = '${nacionalidade.nacionalidade}'
                                where id_nacionalidade = ${nacionalidade.id}
                                `

        let resultNacionalidade = await prisma.$executeRawUnsafe(sql)

        if(resultNacionalidade)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Excluir nacionalidade
const deleteNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id_nacionalidade = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Retornar todas as nacionalidades existentes
const selectAllNacionalidade = async function () {

    try {
        let sql = 'select * from tbl_nacionalidade order by id_nacionalidade desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Buscar uma nacionalidade pelo id
const selectByIdNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id_nacionalidade = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}