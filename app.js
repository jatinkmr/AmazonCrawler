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

    // get the original Price
    const [originalPrice] = await page.$x(`//*[@id="price"]/table/tbody/tr[1]/td[2]/span[1]`)
    const originalPriceText = await originalPrice.getProperty('textContent')
    const originalPriceJson = await originalPriceText.jsonValue()
    const originalPriceFinal = originalPriceJson.replace("\\n", '').trim()

    // get the discounted percentage with amount
    const [savingPrice] = await page.$x(`//*[@id="regularprice_savings"]/td[2]`)
    const savingPriceText = await savingPrice.getProperty('textContent')
    const savingPriceJson = await savingPriceText.jsonValue()
    const savingPriceFinal = savingPriceJson.replace("\\n", '').trim()

    let productDetails = {
        ProductTitle: titleFinal,
        PriceAfterDiscount: priceFinal,
        ImageSource: imageSourceJson,
        OriginalPrice: originalPriceFinal,
        Saving: savingPriceFinal
    };

    console.log('Details => => ', productDetails)

    browser.close();
}

var arguments = process.argv;

console.log(arguments); 

scraper(arguments[arguments.length - 1])

// to run node app.js https://www.amazon.in/Haier-Direct-Cool-Single-Door-Refrigerator-20CFDS/dp/B084496YFG/