/***************************************************************************************
 * objetivo: controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 11/02/2025
 * autor: Hiago
 * versao: 1.0 
 ***************************************************************************************/

//A CONTROLLER TRATA OS DADOS
//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do arquo para realizar o CRUD de dados no banco de dados
const filmeDAO = require('../../model/DAO/filme.js')

//Função para tratar a inscerssão de um novo filme no DAO
const inserirFilme = async function(filme, contentType) {
    try {
        if(String(contentType).toLowerCase == 'application/json')
        {
               if (filme.nome             == '' || filme.nome            == undefined || filme.nome            == null || filme.nome.length            > 80 ||
               filme.duracao          == '' || filme.duracao         == undefined || filme.duracao         == null || filme.duracao.length         > 5 ||
               filme.sinopse          == '' || filme.sinopse         == undefined || filme.sinopse         == null || 
               filme.data_lancamento  == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
               filme.foto_capa        == undefined || filme.foto_capa.length > 200 ||
               filme.link_trailer     == undefined || filme.link_trailer.length > 200 
            ) 
            {
              return message.ERROR_REQUIRED_FIELDS //400
             }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)

                if(resultFilme)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
    }else{
        return message.ERROR_CONTENT_TYPE
    }
} catch (error){
       return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 
}
}


//Função para tratar a atualização de um novo filme no DAO
const atualizarFilme = async function() {
    
}


//Função para tratar a exclusão de um novo filme no DAO
const excluirFilme = async function() {
    
}

//Função para tratar o retorno de uma lista de filmes Do DAO
const listarFilme = async function() {
    try {
        //Objeto do tipo JSON
        let dadosFilmes = {}
        //Chama a funcao para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false){
            if(resultFilme.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilmes.status = true
                dadosFilmes.status_code = 200
                dadosFilmes.items = resultFilme.length
                dadosFilmes.films = resultFilme

                return dadosFilmes
            }else {
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um filme, filtrando pelo ID Do DAO
const buscarFilme = async function() {
    
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}