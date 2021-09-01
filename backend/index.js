require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const app = express();

const {sequelize} = require('./models');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const router = require('./routes/api');
app.use('/api/users',router);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await sequelize.authenticate()
    console.log(`running on PORT ${PORT}`);
})