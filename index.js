import express from 'express'
import { Router } from 'express';

import fetchHabrArticles from './scraper.js';

const app = express()
const URL = 'https://habr.com/ru/articles/'

let parsedArticles = [];
let fetchTime = new Date().toLocaleString();;
app.get('/fetch', (req, res) => {
    fetchHabrArticles(URL).then(articles => {
        fetchTime = new Date().toLocaleString();;
        parsedArticles = articles;
    });
    res.send("Fetching articles...")
});


app.get('/lastfetch', (req, res) => {
    res.send("Last fetch time: " + fetchTime + "\n")
});

app.get('/articles', (req, res) => {
    res.send(parsedArticles);
});


app.get("/", (req, res) => {
    res.send("Health check")
})

const PORT = 3003;    
app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});

