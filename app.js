/***************************************************************
 * objetivo: criar uma API para realizar o CRUD do sistema de controle de filmes
 * data: 11/02/2025
 * autor: Hiago
 * versao: 1.0
 * observacao:
 *      para criar a API precisamos instalar:
 *          express         npm install express --save
 *          cors            npm install cors --save
 *          body-parser     npm install body-parser --save
 * 
 *      para criar a integracao com o banco de dados precisamos instalar:
 *          prisma          npm install prisma --save (para fazer a conexao com o banco de dados)
 *          prisma/client   npm install @prisma/client --save (para rodar os scripts SQL)
 * 
 *      Após a instalação do prisma e do prisma client, devemos:
 *          npx prisma init
 *      Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD 
 *      Após essa configueração deverá rodar o seguinte comando:
 *          npx prisma migrate dev      
**********************************************************************************/

//Import das bibliotecas para configurar a API
const express        = require('express')
const cors           = require('cors')
const bodyParser     = require('body-parser')

//Manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

//Cria o objeto app com referências do express para criar a API
const app = express()

//response - Significa a resposta da API
//request - Significa a chegada de dados na API

app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors()) //Aplica/ATIVA as restrições do CORS da requisição

    next()
})

//Permissão de quais metodos a API irá responder - CORS CUIDA DESSAS PERMISSÕES ---VERBOS HTTP
//get - pegar dados da API na tela
//post - inserir novos itens e salvar 
//put - alterar dados existentes na api
//delete - excluir item existente na API
//options - 

//____________________________________________________________________________________________________________________________________________________________

const controllerFilme = require('./controller/filme/controllerFilme')
const controllerGenero = require('./controller/genero/controllerGenero')
const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade')
const controllerIdioma = require('./controller/idioma/controllerIdioma')

//FILME
app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body

    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
    
})

app.get('/v1/controle-filmes/filme', cors(), async function(request, response){
    //chama a função para retornar os filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da requisição
    let idFilme = request.params.id
    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})


//GENERO
app.post('/v1/controle-genero/genero', cors(), bodyParserJSON, async function (request, response){

let contentType = request.headers['content-type']

let dadosBody = request.body
let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

response.status(resultGenero.status_code)
response.json(resultGenero)

})

app.get('/v1/controle-genero/genero', cors(), async function(request, response){

    let resultGenero = await controllerGenero.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-genero/genero/:id', cors(), async function (request, response) {
    
    let idGenero = request.params.id
    
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-genero/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-genero/genero/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    
    let idGenero = request.params.id
    
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


//NACIONALIDADE
app.post('/v1/controle-nacionalidade/nacionalidade', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    let resultNacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)
    
    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
    
    })
    
    app.get('/v1/controle-nacionalidade/nacionalidade', cors(), async function(request, response){
    
        let resultNacionalidade = await controllerNacionalidade.listarNacionalidades()
    
        response.status(resultNacionalidade.status_code)
        response.json(resultNacionalidade)
    })
    
    app.get('/v1/controle-nacionalidade/nacionalidade/:id', cors(), async function (request, response) {
        
        let idNacionalidade = request.params.id
        
        let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(idNacionalidade)
    
        response.status(resultNacionalidade.status_code)
        response.json(resultNacionalidade)
    })
    
    app.delete('/v1/controle-nacionalidade/nacionalidade/:id', cors(), async function(request, response) {
        let idNacionalidade = request.params.id
    
        let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)
    
        response.status(resultNacionalidade.status_code)
        response.json(resultNacionalidade)
    })
    
    app.put('/v1/controle-nacionalidade/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){
    
        let contentType = request.headers['content-type']
        
        let idNacionalidade = request.params.id
        
        let dadosBody = request.body
    
        let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody,contentType)
    
        response.status(resultNacionalidade.status_code)
        response.json(resultNacionalidade)
    })


    


app.listen('5050', function(){
    console.log('API funcionando e aguardando requisições .....................................')
})