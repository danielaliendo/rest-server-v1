const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
})

module.export = model('User', UserSchema);
