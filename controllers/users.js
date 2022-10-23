const {response} = require('express');

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

const postUser = (req, res = response) => {
    const body = req.body
    // status code 201 means that the request has been fulfilled and resulted in a new resource being created
    res.status(201).json({
        msg: 'post API',
        body
    })
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