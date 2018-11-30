'use strict';

const Boom = require('boom');

const internals = {
    // Make sure we have a reference to `reformat()` that supports the debug option.
    reformat: Boom.internal().reformat
};


internals.reformatErrors = function (request, h) {

    const response = request.response;

    if (Boom.isBoom(response)) {
        internals.reformat.call(response, true);
    }

    return h.continue;
};


exports.plugin = {
    pkg: require('../package.json'),
    requirements: {
        hapi: '>=17.0.0'
    },
    register: function (server, options) {

        server.ext('onPreResponse', internals.reformatErrors);
    }
};
