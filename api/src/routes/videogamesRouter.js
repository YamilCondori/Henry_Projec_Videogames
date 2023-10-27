require('dotenv').config();
const { Router, response } = require('express');
const { Videogame, Gender } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');

const videogamesRouter = Router();

const { API_KEY } = process.env
const url = `https://api.rawg.io/api/games?key=${API_KEY}`

videogamesRouter.get('/' , async (req, res)=> {
    try {
        const videogamesFromDB= await Videogame.findAll({
            limit: 20
        });

        if(videogamesFromDB.length<20){
            const videogamesFromApi = (await axios(url)).data;
            const allVideogames = videogamesFromDB.concat(videogamesFromApi.results);

            return res.status(200).json(allVideogames.slice(0 , 20))
        }

        return res.status(200).json(videogamesFromDB);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

videogamesRouter.get('/name', async (req, res)=>{
    try {
        const { name } = req.query;
        const urlN= `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        let allVideogames = [];

        const dbResults = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        if(dbResults.length<15){
            const apiResponse = (await axios(urlN)).data;
            allVideogames = dbResults.concat(apiResponse.results)
            if(allVideogames.length <= 0) return res.status(404).send({message: 'Videogame not exists'})
            return res.status(200).json(allVideogames.slice(0 , 15));
        }

        return res.status(200).json(dbResults);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

videogamesRouter.get('/:idVideogame', async (req, res)=>{
    try {
        const { idVideogame } = req.params;
        const videogameFromDB = await Videogame.findByPk(idVideogame, {
            include: Gender
        })
        
        if(!videogameFromDB){
            const urlId = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
            let responseAPI = (await axios(urlId)).data;
            //axios arroja un error status=404 por defecto si el videojuego no existe.

            return res.status(200).json(responseAPI)
        }

        return res.status(200).json(videogameFromDB)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

videogamesRouter.post('/', async (req, res)=>{
    try {
        const { name, description, platforms, image, releaseDate, rating, gender } = req.body;
        const newVideogame = await Videogame.create(req.body);

        if(gender){
            const selectedGender = await Gender.findByPk(gender);
            if(selectedGender){
                await newVideogame.addGender(selectedGender)
            }
        }

        return res.status(200).json(newVideogame)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = videogamesRouter