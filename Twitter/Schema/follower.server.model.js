'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,        

/**
 * Follower Schema
 */
var FollowerSchema = new Schema({    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    follower: {
        type: Schema.ObjectId,
        ref: 'User'
    }    
},{
    timestamps: true
});

/**
 * Hook a pre save method to do to after operations
 */

FollowerSchema.pre('save', function(next) {
    var thisObj = this;
    // Do the stuff you want to do before saving the follower
    // e.g schedule a job.cast a message into kafka or RabbitMQ queue    
    next();
    
});


mongoose.model('Follower', FollowerSchema);

/* @@Keys
 * user - user whose followers we want to see
 * follower - who followed this user
 */
