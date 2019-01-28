'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,        

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    poster: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    tweet: {
        type: Schema.ObjectId,
        ref: 'Tweet'
    },
    activity : {
        type : String,
        enum : ['Like','share','tweet','Retweet','Reply']
    }    
},{
    timestamps: true
});

/**
 * Hook a pre save method to do to after operations
 */

ActivitySchema.pre('save', function(next) {
    var thisObj = this;
    // Do the stuff you want to do before saving the follower
    // e.g schedule a job.cast a message into kafka or RabbitMQ queue for updating the "likes" key in 'Tweet' document.
    next();
    
});


mongoose.model('Activity', ActivitySchema);

/* @@Keys
 * user - user whose followers we want to see
 * follower - who followed this user
 */
