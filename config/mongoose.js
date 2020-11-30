const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/GitLab_Auth');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function(){
    console.log('Connected to database:: MongoDB');
});

module.exports= db;
