const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/user');
const heroRoute = require('./routes/hero');

require('dotenv').config()

mongoose.connect(`mongodb+srv://masterapp:${process.env.MONGODB_PASSWORD}@cluster-0-xdixy.mongodb.net/test?retryWrites=true&w=majority`).then(() => {
  console.log('Connected to database!');
}).catch((e) => {
  console.log(`Connection fail ${e}`);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/hero', heroRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
})
