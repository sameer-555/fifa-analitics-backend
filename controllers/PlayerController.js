'use strict'
const Player = require("../models/players");

//getSingle players by id
const getPlayerById = async (req, res, next) => {
    //search by player id and search by full name api
    let player_id = 0
    if (req.params.id) {
        player_id = parseInt(req.params.id)
    } else {
        return res.status(400).send("Player Id in parameter mandatory")
    }
    try {
        const player = await Player.find({ 'player_id': player_id })
        return res.status(200).send(player)
    } catch (err) {
        return res.status(500).send(err)
    }

}

//home view with call players
const getPlayers = async (req, res) => {
    let offset = 0
    let limit = 9
    if (req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit)
    }
    const players_details = {}
    try {
        players_details['total_count'] = await Player.count()
        players_details['offset'] = offset
        players_details['limit'] = limit
        players_details['data'] = await Player.find().skip(offset).limit(limit)
        return res.status(200).send(players_details)
    } catch (err) {
        return res.status(400).send(err)
    }
}

//for deletion of player using player id
const deletePlayer = async (req, res, next) => {
    let player_id = 0
    if (req.params.id) {
        player_id = parseInt(req.params.id)
    } else {
        return res.status(400).send("Player Id in parameter mandatory")
    }
    try {
        const player = await Player.findOneAndDelete({ 'player_id': player_id })
        if (player) {
            return res.status(200).send(player)
        } else {
            return res.status(404).send("player not found")
        }
    } catch (err) {
        return res.status(400).send(err)
    }

}

//for updating the player object except the player id field
const updatePlayer = async (req, res, next) => {
    if (req.params.id) {
        let player_id = parseInt(req.params.id)
        if (req.body) {
            try {
                delete req.body.player_id
                const updated_player = await Player.findOneAndUpdate({ 'player_id': player_id }, req.body)
                return res.status(200).send(updated_player)
            } catch (err) {
                return res.status(400).send(err)
            }
        } else {
            return res.status(400).send('body is required')
        }
    } else {
        return res.status(400).send("Player Id in parameter mandatory")
    }
}

//create new player
const createPlayer = async (req, res, next) => {
    //finding the last inter player id to make sure new record player id is always unique
    if (req.body) {
        try {
            const last_player = await Player.findOne().sort('-player_id').limit(1).exec()
            req.body['player_id'] = last_player['player_id'] + 1
            let new_player = new Player(req.body)
            let new_player_id = await new_player.save()
            return res.status(201).send(new_player_id)
        } catch (err) {
            return res.status(400).send(err)
        }
    } else {
        return res.status(400).send("body is required")
    }

}


module.exports = {
    getPlayerById,
    createPlayer,
    deletePlayer,
    updatePlayer,
    getPlayers
}