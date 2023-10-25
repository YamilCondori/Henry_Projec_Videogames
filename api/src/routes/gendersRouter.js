const { Router } = require('express');

const gendersRouter = Router();

gendersRouter.get('/', (req, res)=>{
    try {


        return res.status(200).json('All genders from api/db')
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = gendersRouter