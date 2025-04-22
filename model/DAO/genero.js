/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de idiomas
* data: 15/04/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

//Inserir um novo genero
const insertGenero = async function(genero){

    try {

        let sql = `insert into tbl_genero ( genero
                                            )

                                            values
                                            (
                                            '${genero.genero}'
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

//Atualizar genero
const updateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set    genero = '${genero.genero}'
                                where id_genero = ${genero.id}
                                `

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if(resultGenero)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Excluir genero
const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Retornar todos os generos existentes
const selectAllGenero = async function () {

    try {
        let sql = 'select * from tbl_genero order by id_genero desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Buscar um genero pelo id
const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}