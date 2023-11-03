require('dotenv').config();
const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');

const videogamesRouter = Router();

const { API_KEY } = process.env
const url = `https://api.rawg.io/api/games?key=${API_KEY}`

videogamesRouter.get('/' , async (req, res)=> {
    try {
        const videogamesFromDB= await Videogame.findAll({
            limit: 100,
            include: Genre
        });

        // if(videogamesFromDB.length<100){
        //     let videogamesFromApi = (await axios(url)).data;
        //     let allVideogames = videogamesFromDB.concat(videogamesFromApi.results);
        //     while(allVideogames.length<100){
        //         videogamesFromApi = (await axios(videogamesFromApi.next)).data;
        //         allVideogames = allVideogames.concat(videogamesFromApi.results)
        //     }

        //     console.log(allVideogames.length);
        //     return res.status(200).json(allVideogames)
        // }

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
            include: Genre
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
        const { name, description, platforms, image, releaseDate, rating, genres } = req.body;
        const newVideogame = await Videogame.create(req.body);

        if(genres.length>0){
            genres.map(async (idGenre)=>{
                const selectedGenre = await Genre.findByPk(idGenre);

                if(selectedGenre){
                    await newVideogame.addGenre(selectedGenre)
                }
            })
        }

        return res.status(200).json(newVideogame)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = videogamesRouter