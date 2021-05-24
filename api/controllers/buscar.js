const { crawler } = require('../config');
const puppeteer = require('puppeteer');
const helpers = require('../helpers');
const qs = require('querystring');
const cheerio = require('cheerio');


const validators = require('../validators');

buscaSite = async (baseUrl, params) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
    const page = await browser.newPage();
    await page.goto(baseUrl + '/default.aspx?' + qs.stringify(params));

    await page.waitForSelector('#rooms_results');
    await page.waitForFunction('document.querySelector("h6.bestPriceTextColor").innerText');

    const html = await page.evaluate(() => new XMLSerializer().serializeToString(document)).catch((err) => console.log(err));
    browser.close();
    return html;
}

anaisarSite = (body) => {
    let response = {acessível: []};
    const $ = cheerio.load(body);
    $('tr.roomName').each((index, elem) => {
        let room = {};
        $elem = cheerio.load(elem);
        
        let imageURL = $elem('.roomSlider').find('.slide').not('.bx-clone').find('img').attr('src');
        if (helpers.caminho(imageURL)){
            imageURL = crawler.website + imageURL;
        }
        room.imageURL = imageURL;

        const $descricao = $elem('.excerpt');
        room.name = $descricao.find('h5 > a').html();
        room.preco = $elem('h6.bestPriceTextColor').html();
        room.descricao = $descricao.find('p > a').html();

        response.acessível.push(room);
    });
    return response;
}

const buscar = {
    webCrawler: (req, res) => {
        const validacao = validators.validateBuscar(req);
        if (!validacao.isValid) {
            res.status(400).send({
                err: validacao
            });
            return;
        }
        let params = crawler.fixedParams;
        params.CheckIn = req.body.checkin.replace(new RegExp('/', 'g'), ''); // remove /
        params.CheckOut = req.body.checkout.replace(new RegExp('/', 'g'), ''); // remove /
        buscaSite(crawler.website, params).then((html) => {
            res.status(200).send(anaisarSite(html));
        }).catch((err) => {
            res.status(408).send({err: err});
        });
    }
}

module.exports = buscar;