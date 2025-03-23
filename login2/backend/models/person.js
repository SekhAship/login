const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the person model


 
const Person = mongoose.model('Person', personSchema);

module.exports = Person;

