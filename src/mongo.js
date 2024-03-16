const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./users');
const run = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/water_table_1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Add the following option to suppress the deprecation warning about `useFindAndModify`
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

run.use(cors());
run.use(express.json());

run.get('/getUseres',(req,res)=> {
    UserModel.find()
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

run.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
