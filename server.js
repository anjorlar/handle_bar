require('dotenv').config({ path: 'dev.env' });
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view-engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`unable to print file`)
        }
    });
    next()
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/practice', (req, res) => {
    res.send({
        name: `Ade`,
        likes: [
            'reading',
            'football',
            'politics'
        ]
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'WELCOME TO THE HOMEPAGE',
        content: `20`
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: `About Page`,
        // currentYear: new Date().getFullYear(),
        content: `20`
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: `path not found`
    })
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});