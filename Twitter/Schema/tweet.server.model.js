'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,        

/**
 * Tweet Schema
 */
var TweetSchema = new Schema({
    tweetText: {
        type: String,
        trim: true
    },    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },    
    createdAt : {
        type : Date,
        default : new Date()
    },
    isTweet: {
        type: Boolean,
        default: false
    },
    isReply: {
        type: Boolean,
        default: false
    },
    isRetweet: {
        type: Boolean,
        default: false
    },
    likes : {
        type: Number,
        default: 0
    },
    retweets : {
        type: Number,
        default: 0
    },    
    shares : {
        type: Number,
        default: 0
    },
    replies : {
        type: Number,
        default: 0
    },
    originalTweet: {
        type: Schema.ObjectId,
        ref: 'Tweet'
    }
},{
    timestamps: true
});

/**
 * Hook a pre save method to do to after operations
 */

TweetSchema.pre('save', function(next) {
    var thisObj = this;
    // Do the stuff you want to do before saving the tweet
    // e.g schedule a job.cast a message into kafka or RabbitMQ queue    
    next();
    
});


mongoose.model('Tweet', TweetSchema);

/* @@Keys
 * user - user to which this tweet belongs
 * isTweet - whether the document is a tweet
 * isRetweet - whether the document is a re-tweet
 * originalTweet - to fetch the replies and re-tweets of a tweet
 */
