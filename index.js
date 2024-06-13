import express from 'express'
import { Router } from 'express';

import fetchHabrArticles from './scraper.js';

const app = express()
const URL = 'https://habr.com/ru/articles/'

let parsedArticles = [];
app.get('/fetch', (req, res) => {
    fetchHabrArticles(URL).then(articles => {
        parsedArticles = articles;
    });
    res.send("Fetching articles...")
});

app.get('/articles', (req, res) => {
    res.send(parsedArticles);
});
    
const PORT = 3003;    
app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});

