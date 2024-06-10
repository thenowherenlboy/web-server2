const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const fc = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define path for Express config
const public = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

// Name of creator variable

const name = 'Nathan Grumblecakes';

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Page',
        name,
        helpText: 'Um, so like you stick a location or address in the "Location" box and mash that "Search" button, then the weather is displayed on the page.'
    });
});

app.get('/weather', (req, res) => {
    var addy = req.query.address;
    if (!addy) {
        return res.send({
            error: 'You must provide a valid address or location.'
        });
    }

    geocode(addy, (error, {latitude, longitude, location} = {}) => { //
        if (error) return res.send({error});
        fc.forecast2(latitude, longitude, (error, data) => {
            if (error) return res.send({error});
            return res.send({
                forecast: data,
                location,
                address: addy
            });
        });
    });

    // geocode(addy, (error, {latitude, longitude, location}) => {
    //     if (error) return res.send(error);
    //     forecast.forecast2(latitude,longitude, (error, data) => {
    //         if (error) return res.send(error);
    //         return res.send({ location, data });
    //     });
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message:'Help article not found.',
        name,
        title: 'What were you thinking?'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Yap, this ain\'t the droid you\'re lookin\' for...',
        name,
        title:'Can\'t Sit Here...'
    });
});

// app.com  
// app.com/help
// app.com/about

app.listen(port, () =>{
   console.log(`Server is up on port ${port}.`); 
});