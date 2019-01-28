'use strict'; 
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),    
    User = mongoose.model('User'),
    Follower = mongoose.model('Follower'),
    Tweet = mongoose.model('Tweet');     

/**
 * Timeline of a user
 */
exports.list = function(req, res) {
    let query = {
        user : req.user
    }
    // get list of followers
    Follower.find(query).sort('-createdAt').exec(function(err, followers) {
        if (err) {
            return res.status(400).send({
                error: true,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // make an array of userId of req.user's followers
            let followerIds = followers.map(follower => follower.follower);
            // Fetch all the tweets of all these users sorted by their timestamp
            let tweetQuery = {
                user : { $in : followerIds }
            }
            Tweet.find(tweetQuery).sort('-createdAt').exec(function(err, tweets) {
                if (err) {
                    return res.status(400).send({
                        error: true,
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    return res.status(200).send({
                        error : false,
                        message : "Timeline fetched successfully",
                        data : tweets                        
                    });
                }
            }
        }
    });
};
