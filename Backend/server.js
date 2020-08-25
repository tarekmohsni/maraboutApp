var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

require('./A/router/routers.js')(app);

const db = require('./A/config/db.config.js');

const Role = db.role;
const Permission =db.permissions;
const path = require('path');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();
});

//require('./app/route/project.route.js')(app);

// Create a Server
app.use('/images', express.static(path.join('A/images')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})


function initial(){
    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "ADMIN"
    });
    Permission.create({
        permission_id: 1,
        label: "save",
    });
    Permission.create({permission_id: 2,
            label: "delete"}
    );
    Permission.create({permission_id: 3,
            label: "update"}
    )


}
