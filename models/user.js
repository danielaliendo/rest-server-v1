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
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user} = this.toObject();
    return user
}

module.exports = model('User', UserSchema);
