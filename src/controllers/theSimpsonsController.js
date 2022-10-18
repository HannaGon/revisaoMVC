const db = require("../models/db")


const obterPersonagens = async (request,response) =>{
    const personagens = await db("the-simpsons")
    //erro caso o json/bd não ter dado nenhum
    if (personagens.length === 0) return response.status(200).send([])
    const parametros = request.query
    //checa se foi enviado algum parametro, se não, retorna dados do json
    if (Object.keys(parametros).length ==0 ) return response.status(200).send(personagens)
    //busca por qualquer dado em qualquer parte do json
    //exemplo: personagem/nome=t
    //retorna todos os personagens com "t" no nome
    const filtrado = []
    for (const personagem of personagens){
        const chaves = Object.keys(personagem)
        for (const chave of chaves){
            const personagemDado = personagem[chave].toString().toLowerCase()
            const buscaDado = parametros[chave] && parametros[chave].toLowerCase()
            if (personagemDado.includes(buscaDado)){
                filtrado.push(personagem)
            }
        }
    }
    if (filtrado.length === 0) {
        return response.status(404).send({
            message: "Nenhum resultado para essa busca"
        })
    }
    response.status(200).send(filtrado)
}

const cadastrarPersonagem = async (request,response)=>{
    const personagens = await db("the-simpsons")
    //nome e idade obrigatorios
    const {
        nome, idade, catchphrase
    } = request.body
    //regras de negocio
    //não permitir cadastro em dobro
    if (!nome || nome.trim() === "") {
        return response.status(400).send({ message: `O nome é obrigatório`})
    }

    if (isNaN(idade)|| idade<=0){
        return response.status(400).send({message: `A idade é obrigatória`})
    }
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