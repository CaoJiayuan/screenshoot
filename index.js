const puppeteer = require('puppeteer');

var express = require('express')
var app = express()

app.get('/', function (req, res) {
    puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu']
    }).then(browser => {
        browser.newPage().then(page => {
            let width = parseInt(req.query.width) || 1360
            let height = parseInt(req.query.height) || 768
            page.setViewport({width:width,height:height}).then(() => page.goto(req.query.url).then(p => {
                console.log(`Shooting... [${req.query.url}] `);
                page.title().then(title => {
                    let name = req.query.name || title

                    page.screenshot({path: `./shoots/${name}.png`}).then(re => browser.close())
                })
            }))
        })
    });
    res.send('Hello World')
})

app.listen(3003, () => console.log('Server on'))
