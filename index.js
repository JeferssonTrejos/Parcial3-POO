const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const modulos = require('./routers/router');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', modulos);
// app.use('/', express.static('public'));

app.get('/ping', (req, res) => {
    res.json({ ping: 'pong' })
})

const MONGO_DB_URL = 'mongodb://mongo:LPkQHNZeWCfCBYTzCIshPlwEduUwTuCp@monorail.proxy.rlwy.net:42171/dbcurso?authSource=admin';
// const MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/dbcurso?authSource=admin';

mongoose.connect(MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión de MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


