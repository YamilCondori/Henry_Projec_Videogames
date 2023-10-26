const { Router } = require('express');
const { Videogame } = require('../db');

const videogamesRouter = Router();

videogamesRouter.get('/' , async (req, res)=> {
    try {
        const allVideogames= await Videogame.findAll();

        return res.status(200).json(allVideogames);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

videogamesRouter.get('/name', async (req, res)=>{
    try {
        const { name } = req.query;

        const dbResults = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        return res.status(200).json(dbResults);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

videogamesRouter.get('/:idVideogame', async (req, res)=>{
    try {
        const { idVideogame } = req.params;
        const soughtVideogame = await Videogame.findOne({where: { idDB: idVideogame }});

        if(!soughtVideogame){
            return res.status(404).send('Videogame not founded');
        }

        return res.status(200).json(soughtVideogame)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

videogamesRouter.post('/', async (req, res)=>{
    try {
        const { name, description, platforms, image, releaseDate, rating } = req.body;
        const newVideogame = await Videogame.create(req.body);


        return res.status(200).json(newVideogame)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = videogamesRouter