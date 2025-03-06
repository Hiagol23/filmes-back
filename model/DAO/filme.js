/**********************************************************************************
* objetivo: criar a comunicacao com o banco de dados para fazer o CRUD de filmes
* data: 11/02/2025
* autor: Hiago
* versao: 1.0
***********************************************************************************/

//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
        
    //Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()


//Objeto tipo JSON
//Funcao para inserir um novo filme
const insertFilme = async function(filme){

    try {
        

        let sql = `insert into tbl_filme ( nome,
                                       duracao,
                                       sinopse,
                                       data_lancamento,
                                       foto_capa,
                                       link_trailer
                                     )
                                       
                                     values 
                                     (
                                     '${filme.nome}',
                                     '${filme.duracao}',
                                     '${filme.sinopse}',
                                     '${filme.data_lancamento}',
                                     '${filme.foto_capa}',
                                     '${filme.link_trailer}'
                                     )`
        //pedindo para o prisma executar a variavel no my sql
        //executa o script sql no banco de dados e aguarda o retorno do BD para saber se deu certo
        let result = await prisma.$executeRawUnsafe(sql) //IMPORTANTE  *aguarde o bd responde*

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

//Funcao para atualizar um filme existente 
const updateFilme = async function (){

}

//Funcao para excluir um filme existente
const deleteFilme = async function () {
    
}

//Funcao para retornar todos os filmes existentes
const selectAllFilme = async function () {
 
    try{
        //SRIPT SQL PARA RETORNAR TODOS OS DADOS
        let sql = 'select * from tbl_filme order by id desc'

        //EXECUTA O SCRIPTSQL NO BD E AGUARDA O RETORNO DE DADOS
        let result = await prisma.$queryRawUnsafe (sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Funcao para buscar um filme pelo ID
const selectByIdFilme = async function() {
    
}

//*UM SELECT PARA CADA FUNCTION*

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
}