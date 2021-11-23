var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;


mongoose.connect('mongodb://127.0.0.1:27017/proyecto', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conexion exitosa");
        app.listen(port, function() {
            console.log("El servidor de api rest de musica eschando en http://localhost:" + port);
        });
    }

});