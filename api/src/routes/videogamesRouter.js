const { Router } = require('express');

const videogamesRouter = Router();

videogamesRouter.get('/' , (req, res)=> {
    try {
        return res.status(200).json({message: "all correct"})
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

videogamesRouter.get('/:idVideogame', (req, res)=>{
    try {
        return res.status(200).json({message: 'id videogame correct'})
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

videogamesRouter.get('/name', (req, res)=>{
    try {
        const { name } = req.query;

        return res.status(200).json({message:name});
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = videogamesRouter