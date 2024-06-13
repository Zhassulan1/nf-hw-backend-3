import axios from 'axios';
import cheerio from 'cheerio';

async function fetchHabrArticles(URL) {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const articles = [];

        $('.tm-articles-list__item').each((index, element) => {
            const author = $(element).find('.tm-user-info__username').text().trim();
            const publicationTime = $(element).find('time').attr('title').trim();
            const title = $(element).find('.tm-title__link').text().trim();
            const link = `https://habr.com${$(element).find('.tm-article-snippet__title-link').attr('href')}`;
            const complexity = $(element).find('.tm-article-complexity__label').text().trim();
            const timeToRead = $(element).find('.tm-article-reading-time__label').text().trim();
            const views = $(element).find('.tm-icon-counter__value').text().trim();
            const publicationHubs = [];

            $(element).find('.tm-publication-hub__link-container').each((index, hub) => {
              const hubName = $(hub).find('.tm-publication-hub__link').text().trim();
              publicationHubs.push(hubName);
            });

            const image = $(element).find('.tm-article-snippet__lead-image').attr('src');
            const body = $(element).find('.article-formatted-body.article-formatted-body.article-formatted-body_version-2').text().trim();

            const rating = $(element).find('.tm-votes-meter__value.tm-votes-meter__value.tm-votes-meter__value_appearance-article.tm-votes-meter__value_rating').text().trim();
            const bookmarks = $(element).find('.bookmarks-button__counter').text().trim();
            const comments = $(element).find('.tm-article-comments-counter-link__value').text().trim();
            articles.push({
                author,
                publicationTime,
                title,
                link,
                complexity,
                timeToRead,
                views,
                publicationHubs,
                image,
                body,
                rating,
                bookmarks,
                comments,
            });
        });

        return articles;
    } catch (error) {
        console.error('Error fetching Habr articles:', error);
        return [];
    }
}


export default fetchHabrArticles;