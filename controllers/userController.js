var models = require('../models');
var { errorResponse , successResponse } = require('../helpers/response');
const { Op } = require('sequelize');
const authService = require('../services/auth');
const async = require('hbs/lib/async');


 async function signUp(req, res, next){
    console.log(req.body)
    const username = req?.body?.username
    const email = req?.body?.email
    const name = req?.body?.name
    const password = req?.body?.password
    if (username?.length < 4) {
        res.send(errorResponse('username is invalid'))
    }
    if (name?.length < 4) {
        res.send(errorResponse('name is invalid'))
    }
    if (password?.length < 4) {
        res.send(errorResponse('password is invalid'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        res.send(errorResponse('Email is invalid'))
    }
    const [user, created] = await models.users.findOrCreate({
        where: {
            [Op.or]: [
                { username },
                { email }
            ]
        },
        defaults: {
            name,
            password: authService.hashPassword(password),
            username,
            email
        }
    })
    if (created) {
        res.send(successResponse('User created successfully'))
    } else {
        res.send(errorResponse('User already exists!'))
    }
}

 async function signIn(req,res,next){
    var username = req.body.username
    var email = req.body.email
    var password = req.body.password
    const user = await models.users.findOne({
        where: {
            email
        }
    })
    if (user) {
        if (authService.comparePasswords(password, user.password)){
            res.send(successResponse('Logged in Successfully',[], {token: authService.signUser(user)}))
        } else {
            res.send(errorResponse('Incorrect Password'))
        }
    } else {
        res.send(errorResponse('Incorrect User Name'))
    }
}

module.exports.signUp = signUp
module.exports.signIn = signIn