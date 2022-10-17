const express = require("express")
const controller = require("../controllers/theSimpsonsController")

const router = express.Router()
//path, controller
router.get("/the-simpsons/personagens", controller.obterPersonagens)
router.post("/the-simpsons/personagens", controller.cadastrarPersonagem)

module.exports = router