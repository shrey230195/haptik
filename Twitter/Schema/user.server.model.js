'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,    
    validator = require('validator'),
    crypto = require('crypto'),
    generatePassword = require('generate-password')

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function(email) {
    return (validator.isEmail(email));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },    
    otpChances : {
        type : Number,
        default : 3
    },
    username: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: '',
        required: 'Please fill in a password'
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: 'modules/users/client/img/profile/default.png'
    },
    phone: {
        type: String,
        // unique:true,
        required: 'Phone number is required.',
        validate: {
            // Phone number must be of type    +xx-xxxxxxxxxx
            validator: function(phoneNo) {
                if (phoneNo.split('-').length !== 2 || phoneNo.split('-')[0].indexOf('+') !== 0 || phoneNo.split('-')[1].length !== 10 || phoneNo.match(/^[0-9,+,-]+$/) === null) {
                    return false;
                } else {
                    return true;
                }
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    lastLoginAttempt : {
        type : Date,
        default : new Date()
    }    
},{
    timestamps: true
});

/**
 * Hook a pre save method to hash the password
 */

UserSchema.pre('save', function(next) {
    var thisObj = this;
    if (thisObj.password && thisObj.isModified('password')) {
        thisObj.salt = crypto.randomBytes(16).toString('base64');
        thisObj.password = thisObj.hashPassword(thisObj.password);
    }    
    next();
    
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {
        return password;
    }
};

mongoose.model('User', UserSchema);

/* @@Keys
 *
 * lastLogin - Check for last login attempt upon signing up the user
 * 
 */
