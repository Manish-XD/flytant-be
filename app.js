const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const notesRoutes = require('./routes/notes');

const app = express();

app.use(bodyParser.json());

app.use(cors({origin: '*'}));  

app.use(notesRoutes);

mongoose
.connect('mongodb+srv://nodejs:Eren1234@atlascluster.yevtk1s.mongodb.net/assignment?retryWrites=true&w=majority&appName=AtlasCluster')
.then(result => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});