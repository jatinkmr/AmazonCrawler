const puppeteer = require('puppeteer')

async function scraper(url) {
    // launch the browser instance
    const browser = await puppeteer.launch()

    // create a new page in the browser
    const page = await browser.newPage()

    // navigate to url
    await page.goto(url);

    // get the product image
    const [img] = await page.$x(`//*[@id="landingImage"]`)

    // get the image source
    const imageSource = await img.getProperty('src')
    // get the image source text
    const imageSourceJson = await imageSource.jsonValue()

    // get the product title
    const [title] = await page.$x(`//*[@id="productTitle"]`)
    const titleText = await title.getProperty('textContent')
    const titleJson = await titleText.jsonValue()
    const titleFinal = titleJson.replace("\\n", '').trim()

    // get the product price
    const [price] = await page.$x(`//*[@id="priceblock_ourprice"]`)
    const priceText = await price.getProperty('textContent')
    const priceJson = await priceText.jsonValue()
    const priceFinal = priceJson.replace("\\n", '').trim()

    let productDetails = {
        ProductTitle: titleFinal,
        PriceAfterDiscount: priceFinal,
        ImageSource: imageSourceJson
    };

    console.log('Details => => ', productDetails)

    browser.close();
}

var arguments = process.argv;

// console.log(arguments[arguments.length-1]); 

scraper(arguments[arguments.length - 1])

// to run node app.js https://www.amazon.in/Haier-Direct-Cool-Single-Door-Refrigerator-20CFDS/dp/B084496YFG/ref=sr_1_3?dchild=1&pf_rd_p=c37696de-37e6-4a7e-89fe-6076a6ae96a5&pf_rd_r=CHEC93MZKX3GYHR90WST&qid=1610169242&refinements=p_85%3A10440599031&rps=1&s=kitchen&sr=1-3