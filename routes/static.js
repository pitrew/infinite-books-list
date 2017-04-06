'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-static'
};
