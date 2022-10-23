const {response} = require('express');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res = response) => {

    const {nombre = 'Usuari@ anónimo', key} = req.query;

    res.status(403).json({
        msg: 'get API',
        nombre,
        key
    })

};

const putUser = (req, res = response) => {

    const {id} = req.params;
    // status code 400 means that the request cannot be fulfilled due to bad syntax by a client error.
    res.status(400).json({
        msg: 'put API',
        id
    });

};

const deleteUser = (req, res = response) => {
    // status code 500 given when no more specific message is suitable.
    res.status(500).json({
        msg: 'delete API'
    })
};

const postUser = async (req, res = response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors
        })
    }

    const {
        name,
        email,
        password,
        role,
    } = req.body

    const user = new User({
        name,
        email,
        password,
        role,
    });

    // User password is encrypted
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // Save on database

    try {
        await user.save();
        // status code 201 means that the request has been fulfilled and resulted in a new resource being created
        res.status(201).json({
            user
        })
    } catch (e) {
        console.log(e);
        // TODO: handle the error
    }


};

const patchUser = (req, res = response) => {
    // status code 201 means that the request has been fulfilled and resulted in a new resource being created
    res.status(201).json({
        msg: 'patch API'
    })
};

module.exports = {
    getUsers,
    putUser,
    deleteUser,
    postUser,
    patchUser
};