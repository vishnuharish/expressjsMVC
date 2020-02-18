const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');


module.exports = function () {
    let server = express(), create, start;

    create = (config, db) => {
        let routes = require('../routes');
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }));


         mongoose.connect(
            db.dbUrl,
            {
                auth: db.auth,
                useNewUrlParser:true,
                useCreateIndex: true
            }
        );

        routes.init(server);
    };

    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, () => { console.log(`Express server is listening on http://${hostname}:${port}`)})
    };

    return {
        create: create,
        start: start
    };

};


