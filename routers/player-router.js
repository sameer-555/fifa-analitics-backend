const express = require('express')
const { getPlayerById, createPlayer, deletePlayer, updatePlayer, getPlayers } = require("../controllers/PlayerController")
const router = express.Router();

router.get('/player/:id', getPlayerById)
router.get('/players', getPlayers)
router.put('/player/:id', updatePlayer)
router.delete('/player/:id', deletePlayer)
router.post('/player', createPlayer)

module.exports = {
    routes: router
}