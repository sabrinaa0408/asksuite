const { webCrawler } = require('../controllers/buscar');

module.exports = (router) => {
    router.route('/buscar').post(webCrawler);
}