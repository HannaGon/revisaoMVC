const db = require("../models/db")

const obterPersonagens = async (request,response) =>{
    const personagens = await db("the-simpsons")
    response.status(200).send(personagens)
}

const cadastrarPersonagem = async (request,response)=>{
    const personagens = await db("the-simpsons")
    //nome e idade obrigatorios
    const {
        nome, idade, catchphrase
    } = request.body
    //regras de negocio
    //não permitir cadastro em dobro
    const nomeExiste = personagens.some(personagem => personagem.nome === nome)
    if (nomeExiste === true){
        return response.status(409). send({ message: `O nome ${nome} já existe`})
    }
    //construir o personagem
    const novoPersonagem = {
        id: personagens.length,nome, idade, catchphrase
    }
    personagens.push(novoPersonagem)
    response.status(201).send(novoPersonagem)
}

module.exports = {
    obterPersonagens,
    cadastrarPersonagem
}