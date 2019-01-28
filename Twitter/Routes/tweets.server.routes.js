'use strict';

/**
 * Module dependencies
 */
var timeline = require('../Controllers/timeline.server.controller')    

module.exports = function(app) {
    app.route('/api/timeline')
        .get(timeline.list)        
};
