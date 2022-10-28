const {response} = require('express');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const {User} = require('../models');

const getUsers = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query
    const query = {status: true}

    if (isNaN(from)) {
        return res.status(400).json([
            {
                "value": from,
                "msg": "from must be a number",
                "param": "from",
                "location": "query"
            },
        ])
    }

    if (isNaN(limit)) {
        return res.status(400).json([
            {
                "value": limit,
                "msg": "limit must be a number",
                "param": "limit",
                "location": "query"
            },
        ])
    }

    const [count, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(!isNaN(from) ? Number(from) : 0)
            .limit(!isNaN(from) ? Number(limit) : 5)
    ])

    res.status(200).json({
        count,
        users
    })

};

const putUser = async (req, res = response) => {

    const {id} = req.params;

    const {_id, password, google, ...params} = req.body;

    if (password) {
        // User password is encrypted
        const salt = bcrypt.genSaltSync(10);
        params.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, params, {new: true});

    res.status(200).json({
        msg: 'put API',
        user
    });

};

const deleteUser = async (req, res = response) => {

    const {id} = req.params;

    userAuthenticated = req.user
    const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});

    res.status(200).json({
        user,
        userAuthenticated
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