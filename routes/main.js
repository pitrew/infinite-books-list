'use strict';

const Path = require('path');
const Fs = require('fs');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: (request, reply) => {
            reply.file(Path.join(__dirname, '..', 'public', 'index.html'));
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-main'
};
