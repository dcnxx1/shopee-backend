const html = require('./style')
const puppeteer = require('puppeteer')




function formatDocument (bag){
const templateArray = []

bag.forEach(obj => {
  const totalPrice = calculateTotalPrice(obj.actual_price, obj.amount)
  templateArray.push({model: obj.model, amount: obj.amount, total_price: totalPrice, actual_price: obj.actual_price, displayPrice: obj.price})
})
const taxCalculated = calculateTax(templateArray)
return html(templateArray, taxCalculated)
}

function calculateTax(templateArray){
const orderPriceArray = templateArray.map(obj => ({actualPrice: obj.actual_price, amount: obj.amount}))
const taxPercentage = 21 // nederland 
var arr = []
  for(let order of orderPriceArray){
    const getTotalPrice = order.actualPrice * order.amount
    arr.push(getTotalPrice)
  }  
const subTotalWithTax = arr.reduce((sum, add) => sum + add, 0).toFixed(2)
const taxxed = subtract21(taxPercentage, subTotalWithTax)
const taxSubtracted = withoutTax(subTotalWithTax, taxxed)

return {subTotalWithTax, withoutTax: taxxed, amountTaxed: taxSubtracted}
}

function subtract21(taxPercentage, subTotalWithTax){
return (subTotalWithTax / 100 * taxPercentage).toFixed(2)
}

function withoutTax(subTotalWithTax, taxxed){
return subTotalWithTax - taxxed
}




function calculateTotalPrice(actual_price, amount){
  const priceToFloat = parseFloat(actual_price).toFixed(2)
  return (priceToFloat * amount).toFixed(2)
}






exports.make =  async (bag) => {
  
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  await page.setContent(formatDocument(bag, calculateTax))
  const pdfBuffer = await page.pdf({printBackground: true});
  await page.close();
  await browser.close();

  return pdfBuffer;
}


