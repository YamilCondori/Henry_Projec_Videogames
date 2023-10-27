require('dotenv').config()
const axios = require('axios');
const { Router } = require('express');
const { API_KEY } = process.env;
const { Gender } = require('../db') 

const gendersRouter = Router();

gendersRouter.get('/', async (req, res)=>{
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`
    try {
        const allGenders = await Gender.findAll();
        
        if(allGenders.length < 1){
            console.log('entroaca');
            const responseAPI = (await axios(url)).data;

            const genresToCreate = responseAPI.results.map(genre=>{
                const { id , name } = genre;
                return { id , name };
            })

            const createdGenres = await Gender.bulkCreate(genresToCreate);
            return res.status(200).json(createdGenres);
        }


        return res.status(200).json(allGenders);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = gendersRouter