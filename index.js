
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

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

server.connection({
    host: env.NODE_IP || '0.0.0.0', 
    port: env.NODE_PORT || 3000
});

server.register(Inert, () => {});

server.register([
        require('./routes/static'),
        require('./routes/main'),
    ], (err) => {

        if (err) {
            throw err;
        }

        // Start the server
        server.start((err) => {
            console.log('Server running at:', server.info.uri);
        });

    });