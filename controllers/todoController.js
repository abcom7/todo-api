
var models = require('../models');
var { errorResponse , successResponse } = require('../helpers/response');
const { Op } = require('sequelize');

exports.store = async (req,res) => {
    const name = req.body?.name
    const completed = req.body?.completed
    const [todo, created] = await models.todos.findOrCreate({
        where: {
            [Op.and]:[
                {
                    name
                },
                {
                    userId: req.user.id
                }
            ]
        },
        defaults: {
            name,
            completed,
            userId: req.user.id
            
        }
    })
    if (created){
        res.send(successResponse('Todo has been added'))
    } else {
        res.send(errorResponse('You have already added this todo'))
    }
}