'use strict';

const Boom = require('boom');
// const mongojs = require('mongojs');

exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/api/books/{start}/{size}/{sort}/{filter?}',
        handler: (request, reply) => {
            const start = +request.params.start;
            const size = +request.params.size;
            const sort = request.params.sort.split(',');
            const sortOrder = (sort[1] === 'asc') ? 1 : -1;

            let dbSort = {};
            if (sort[0] === 'book') {
                dbSort = { name: sortOrder };
            } else if (sort[0] === 'author') {
                dbSort = { 'author.name': sortOrder };
            } else {
                dbSort = {};
            }

            let dbFilter = {};
            if (request.params.filter) {
                const filter = request.params.filter.split(',');
                dbFilter = filter.reduce((acc, f) => {
                    const kv = f.split('=');
                    if (kv[1] !== 'any') {
                        acc[kv[0]] = kv[1];
                    }
                    return acc;
                }, {});
            }

            db.books.find(dbFilter).sort(dbSort).skip(start).limit(size, (err, books) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                db.books.find(dbFilter).count((err, total) => {
                    const pagination = {
                        start,
                        size,
                        total,
                        results: books.length,
                    };

                    const result = {
                        pagination,
                        books,
                    };

                    reply(result);    
                });
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};
