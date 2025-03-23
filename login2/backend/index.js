const express = require('express');
const authRouter = require('./Routes/AuthRouter');
const productRoute=require('./Routes/ProductRoute');

const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');

require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/product',productRoute);


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});   