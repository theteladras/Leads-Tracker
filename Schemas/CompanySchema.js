const mongoose = require('mongoose');
const validator = require('validator');

const CompanySchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        contact: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true,
            minlength: 6,
            validate: {
                validator: validator.isMobilePhone,
                message: '{VALUE} is not a valid email address'
            }
        },
        web: {
            type: String,
            require: true,
            minlength: 6
        },
        email: {
            type: String,
            require: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email address'
            }
        },
        mentioned_by_company: {
            type: String,
            require: true
        },
        category: {
            type: String,
            default: 'New'
        },
        date: {
            type: Date,
		    default: new Date(),
        }
    }
);

CompanySchema.index({ email: 1, mentioned_by_company: 1 }, { unique: true });

let CompanyLeads = mongoose.model('CompanyLeads', CompanySchema);

module.exports = CompanyLeads;
