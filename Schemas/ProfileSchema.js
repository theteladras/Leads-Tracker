const mongoose = require('mongoose');
const validator = require('validator');

const ProfileSchema = mongoose.model('Profiles',
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email address'
            }
        },
        company: {
            type: String,
            require: true,
            unique: true,
        },
        managers: {
            type: [String],
        },
        date: {
            type: Date,
		    default: new Date(),
        }
    }
);

module.exports = ProfileSchema;
