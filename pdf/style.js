function clean(string) {
    const convert = string.toString()
    return convert.replace(/[^\w\s]/gi, '')
 }




const style  = `

<style>

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    font-size: 12pt;
    font-family: Verdana, sans-serif;
}


.spread{
    width: 100vw;
    height: 100vh;
    background: url('https://raw.githubusercontent.com/dcnxx1/shopee_frontend/main/src/assets/sshopeelogopng.png') no-repeat ;
    background-size: 750px;
    background-position: center;
    transform: rotate(-30deg);
    position: absolute;
    left: 0px;
    z-index: -5;
}

.container{
    width: 21cm;
    height: 29.7cm;
    display: flex;
    border: 6px solid black;
    max-height: 29.7cm;
    
}

.container-logo{
width: 110px;
height: 50px;
background: #ec6d19;
display: flex;
position: relative;
top: 1.5cm;
left: 1cm; 
}

.container-logo img{
    width: 100px;    
    height: 50px;
}

.ad{
    position: relative;
    width: fit-content;
    height: fit-content;
    right: -9cm;
    border: 2px solid #ec6d19;
    padding: 0.5cm;
    text-align: center;
    
   
}

.ad span{
    display: block;
    
}
.order-info{
    width: 100%;
    height: fi-content;
    display: flex;
    position: relative;
    top: 3cm;
    left: 1cm;
}

.address-recipient{
    width: 100%;
    height: fit-content;

}

.order-date{
    width: 70%;
    height: fit-content;
}


.date{
    display: flex;

}

.invoice-nmbr{
display: flex;

}

.order-date span {
    display: block;
    width: 90%;
}

.address-recipient span {
    display: block;
}


.hide-bug{
    width: 50px;
    height: 25px;
    background-color: white;
    display: block;
    bottom: 6.4cm;
    position: absolute;
}

.order-container{
    width: 90%;
    height: fit-content;
    min-height: 4cm;    
    max-height: fit-content;
    position: relative;
    top: 250px;
    left: 1cm;
}



.order-table{
    width: 100%;
    height: 100%;
    border-collapse: collapse;
}

.order-container  thead{
    border-bottom: 1px solid black;
}

.order-container tbody{
    border-bottom: 1px solid black;
    margin-bottom: 10px;
}

.tax{
    position: relative;
    width: 100%;
    height:100%;
    min-height: 4cm;
    max-height: 5cm;
    max-width: 10cm;
    top: 0.2cm;
    right: -15.5cm;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 0.7cm 0.7cm 0.7cm 0.7cm 0.7cm; 
}

.tax-perc{
    width: 100%;
    display: flex;
}



.tax-perc .text{
width: 100%;
max-width: 6.1cm;
min-width: 6.1cm;
padding-right: 0.2cm;
}

.tax-perc .result{
    width: 100%;
}

.bold{
    font-weight:bold;
}


footer{
    position: absolute;
    bottom: -13cm;
    left: 6cm;
}
footer span{
    display: block;
    text-align: center;
    
}

</style>
`


module.exports = (templateArray, {subTotalWithTax, withoutTax, amountTaxed, date})  => `
<html>
${style}
<title>Factuur Shopee</title>

<div class="spread"></div>
<div class="container-logo">
   <img src="https://raw.githubusercontent.com/dcnxx1/shopee_frontend/main/src/assets/sshopeelogopng.png"/>
</div>   

<div class="ad">
<span> Bedankt voor uw bestelling bij Shopee. Wij hopen u snel weer terug te zien!</span>
</div>

<div class="order-info">
    <div class="address-recipient"> 
        <span>Dhr. Foo Bar</span>
        <span>Hallo-Wereldlaan 1337</span>      
        <span>1 Hacker Way, Menlo Park</span>
        <span>Nederland</span>
        <span>06 01234567<span>
    </div>

    <div class="order-date">
        <div class="date">
            <span>Factuurdatum</span>
            <span>${date}</span>
        </div>
        <div class="invoice-nmbr">
            <span>Factuurnummer</span>
            <span> 52</span>
        </div>

    </div>
</div>


<div class="order-container">
<table class="order-table">
<thead>
      <tr>
        <td>aantal</td>
        <td>omschrijving</td>
        <td>prijs per stuk</td>
        <td>totaal</td>
      </tr>
      
</thead>

    <tbody>
    
${templateArray.map((obj) => (
`<tr>
    <td>${obj.amount}x </td>
    <td>${obj.model}</td>
    <td>€ ${obj.displayPrice}</td>
    <td>€ ${obj.total_price}</td>
</tr>`
)).join('')
}
    </tbody>
</table>


<div class="tax">
    <div class="tax-perc">
    <span class="text bold">subtotaal inclusief BTW </span>
    <span class="result bold"> € ${subTotalWithTax}</span>
    </div>
    <div class="tax-perc">
    <span class="text">totaal exclusief 21% BTW </span>
    <span class="result"> € ${amountTaxed}</span>
    </div>
    <div class="tax-perc">
    <span class="text">BTW 21% </span>
    <span class="result"> € ${withoutTax}</span>
    </div>
    <div class="tax-perc">
    <span class="text bold">subtotaal </span>
    <span class="result bold"> € ${subTotalWithTax}</span>
    </div>
    <div class="tax-perc">
    <span class="text">totaal </span>
    <span class="result"> € ${subTotalWithTax}</span>
    </div>
</div>

<footer>
<span> Shopee -  Hallo-Wereldlaan 1337 - 1 Hacker Way, Menlo Park - Nederland</span>
<span>KVK - 18709165297 - BTW nummer: NL0234567B01<span>
</footer>

</html>
`






