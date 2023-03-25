const mongoose = require('mongoose');

const Event = require('./event');

mongoose.connect('mongodb://localhost:27017/eventScheduler')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected to MongoDB')
})