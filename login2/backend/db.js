const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL=process.env.DB_URL;
mongoose.connect(mongoURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to the database');
});

db.on('connected',()=>{
    console.log('mongodb connected');
})

module.exports=db; 