
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const mongojs = require('mongojs');
const config = require('./config');

const env = process.env;

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.app.db = mongojs(config.db, ['books']);

server.connection({
    host: env.NODE_IP || '0.0.0.0', 
    port: env.NODE_PORT || 3000
});

server.register(Inert, () => {});

server.register([
        require('./routes/static'),
        require('./routes/main'),
        require('./routes/books'),
    ], (err) => {

        if (err) {
            throw err;
        }

        server.start((err) => {
            console.log('Server running at:', server.info.uri);
        });

    });