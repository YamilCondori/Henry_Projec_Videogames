require('dotenv').config()
const axios = require('axios');
const { Router } = require('express');
const { API_KEY } = process.env;
const { Genre } = require('../db') 

const gendersRouter = Router();

gendersRouter.get('/', async (req, res)=>{
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`
    try {
        const allGenres = await Genre.findAll();
        
        if(allGenres.length < 1){
            const responseAPI = (await axios(url)).data;

            const genresToCreate = responseAPI.results.map(genre=>{
                const { id , name } = genre;
                return { id , name };
            })

            const createdGenres = await Genre.bulkCreate(genresToCreate);
            return res.status(200).json(createdGenres);
        }


        return res.status(200).json(allGenres);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = gendersRouter