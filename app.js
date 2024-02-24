const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://zakaraM_DB:zakaraM_DB_2024@cluster0.joqzvcw.mongodb.net/ny-blog?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
    .then(result => console.log('connected to db'))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//listen for  request on port 3000
app.listen(3000);
console.log('server listening on port 3000')

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});