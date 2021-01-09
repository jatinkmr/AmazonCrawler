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
    const finalTitle = titleJson.replace("\\n", '').trim()

    // get the product price
    const [price] = await page.$x(`//*[@id="priceblock_ourprice"]`)
    const priceText = await price.getProperty('textContent')
    const priceJson = await priceText.jsonValue()
    const finalPrice = priceJson.replace("\\n", '').trim()

    // get the original Price
    const [originalPrice] = await page.$x(`//*[@id="price"]/table/tbody/tr[1]/td[2]/span[1]`)
    const originalPriceText = await originalPrice.getProperty('textContent')
    const originalPriceJson = await originalPriceText.jsonValue()
    const finalOriginalPrice = originalPriceJson.replace("\\n", '').trim()

    // get the discounted percentage with amount
    const [savingPrice] = await page.$x(`//*[@id="regularprice_savings"]/td[2]`)
    const savingPriceText = await savingPrice.getProperty('textContent')
    const savingPriceJson = await savingPriceText.jsonValue()
    const finalSavingPrice = savingPriceJson.replace("\\n", '').trim()

    // get delivery date
    const [deliveryDate] = await page.$x(`//*[@id="ddmDeliveryMessage"]`)
    const deliveryDateText = await deliveryDate.getProperty('textContent')
    const deliveryDateJson = await deliveryDateText.jsonValue()
    const finalDeliveryDate = deliveryDateJson.replace("\\n", '').trim()

    // get availability
    const [available] = await page.$x(`//*[@id="availability"]`)
    const availableText = await available.getProperty('textContent')
    const availableJson = await availableText.jsonValue()
    const finalAvailable = availableJson.replace("\\n", '').trim()

    // get model number and year
    const [modelNumber] = await page.$x(`//*[@id="variation_style_name"]/div/span`)
    const modelNumberText = await modelNumber.getProperty('textContent')
    const modelNumberJson = await modelNumberText.jsonValue()
    const finalModelNumber = modelNumberJson.replace("\\n", '').trim()

    // get stars value
    const [stars] = await page.$x(`//*[@id="averageCustomerReviews"]/span[1]`)
    const starsText = await stars.getProperty('textContent')
    const starsJson = await starsText.jsonValue()
    const finalStars = starsJson.replace("\\n", '').trim()

    // get total number of ratings
    const [rating] = await page.$x(`//*[@id="acrCustomerReviewText"]`)
    const ratingText = await rating.getProperty('textContent')
    const ratingJson = await ratingText.jsonValue()
    const finalRating = ratingJson.replace("\\n", '').trim()

    // get shipping price
    const [shippingPrice] = await page.$x(`//*[@id="price-shipping-message"]`)
    const shippingPriceText = await shippingPrice.getProperty('textContent')
    const shippingPriceJson = await shippingPriceText.jsonValue()
    const finalShippingPrice = shippingPriceJson.replace("\\n", '').trim()

    // get EMI Details
    const [emiDetail] = await page.$x(`//*[@id="inemi_feature_div"]/span[2]`)
    const emiDetailText = await emiDetail.getProperty('textContent')
    const emiDetailJson = await emiDetailText.jsonValue()
    const finalEmiDetail = emiDetailJson.replace("\\n", '').trim()

    // get Merchant information
    const [merchant] = await page.$x(`//*[@id="merchant-info"]`)
    const merchantText = await merchant.getProperty('textContent')
    const merchantJson = await merchantText.jsonValue()
    const finalMerchant = merchantJson.replace("\\n", '').trim()

    // get features
    const [feature] = await page.$x(`//*[@id="feature-bullets"]`)
    const featureText = await feature.getProperty('textContent')
    const featureJson = await featureText.jsonValue()
    const finalFeature = featureJson.replace("\\n", '').trim()

    // get product description
    const [description] = await page.$x(`//*[@id="productDescription"]`)
    const descriptionText = await description.getProperty('textContent')
    const descriptionJson = await descriptionText.jsonValue()
    const finalDescription = descriptionJson.replace("\\n", '').trim()

    // get releated items
    const [relatedItem] = await page.$x(`//*[@id="sp_detail"]/div[2]/div`)
    const relatedItemText = await relatedItem.getProperty('textContent')
    const relatedItemJson = await relatedItemText.jsonValue()
    const finalRelatedItem = relatedItemJson.replace("\\n", '').trim()

    let productDetails = {
        ProductTitle: finalTitle,
        MerchantInfo: finalMerchant,
        StyleName: finalModelNumber,
        PriceAfterDiscount: finalPrice,
        ImageSource: imageSourceJson,
        OriginalPrice: finalOriginalPrice,
        Saving: finalSavingPrice,
        DeliveryDate: finalDeliveryDate,
        Availability: finalAvailable,
        StarsRating: finalStars,
        TotalReviewRating: finalRating,
        ShippingPrice: finalShippingPrice,
        EmiDetails: finalEmiDetail,
        Feature: finalFeature,
        Description: finalDescription,
        RelatedItems: finalRelatedItem
    };

    console.log('Details => => ', productDetails)

    browser.close();
}

var arguments = process.argv;

// console.log(arguments); 

scraper(arguments[arguments.length - 1])

// to run node app.js https://www.amazon.in/Haier-Direct-Cool-Single-Door-Refrigerator-20CFDS/dp/B084496YFG/
// to run node app.js https://www.amazon.in/dp/B07R9NJFYF/