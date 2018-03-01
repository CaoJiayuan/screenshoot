const puppeteer = require('puppeteer');

var express = require('express')
var app = express()

app.get('/', function (req, res) {
    puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu']
    }).then(browser => {
        browser.newPage().then(page => {
            page.setViewport({width:1360,height:768}).then(() => page.goto(req.query.url).then(p => {
                console.log(`Shooting... [${req.query.url}] `);
                page.title().then(title => page.screenshot({path: `./shoots/${title}.png`}).then(re => browser.close()))
            }))
        })
    });
    res.send('Hello World')
})

app.listen(3000, () => console.log('Server on'))
