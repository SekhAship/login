const Person = require("../models/person");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const person = await Person.findOne({ email });

        if (person) {
            return res.status(400).json({
                error: 'Person already exists'
            });
        }
        const newPerson = new Person({ name, email, password });
        newPerson.password = await bcrypt.hash(password, 10);
        await newPerson.save();
        res.status(201).json({
            message: 'Person created successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const person = await Person.findOne({
            email
        });
        if (!person) {
            return res.status(400).json({
                error: 'Email does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, person.password);
        if (!isMatch) {
            return res.status(400).json({
                error:'Wrong password'});
        }

        const jwtToken = jwt.sign({
            email: person.email,
            personId: person._id
        }, process.env.SECRET_KEY, {
            expiresIn: '24h'
        });



        res.status(200).json(
            {
                message: 'Login successful',
                success: true,
                token: jwtToken,
                email: person.email,
                name: person.name
            }
        )
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = { login, signup };