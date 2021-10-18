const express = require('express')
const app = express()
// const config = require("./config/config.json")
const nseIndia = require("./product/nseIndia")

let tickerSymbol = ["AARTIIND",
    "ABBOTINDIA",
    "ABFRL",
    "ACC",
    "ADANIENT",
    'ADANIPORTS',
    'ALKEM',
    'AMARAJABAT',
    'AMBUJACEM',
    'APLLTD',
    'APOLLOHOSP',
    'APOLLOTYRE',
    'ASHOKLEY',
    'ASIANPAINT',
    'ASTRAL',
    'AUBANK',
    'AUROPHARMA',
    'AXISBANK',
    'BAJAJ-AUTO',
    'BAJAJFINSV',
    'BAJFINANCE',
    'BALKRISIND',
    'BANDHANBNK',
    'BANKBARODA',
    'BATAINDIA',
    'BEL',
    'BERGEPAINT',
    'BHARATFORG',
    'BHARTIARTL',
    'BHEL',
    'BIOCON',
    'BOSCHLTD',
    'BPCL',
    'BRITANNIA',
    'CADILAHC',
    'CANBK',
    'CANFINHOME',
    'CHOLAFIN',
    'CIPLA',
    'COALINDIA',
    'COFORGE',
    'COLPAL',
    'CONCOR',
    'COROMANDEL',
    'CROMPTON',
    'CUB',
    'CUMMINSIND',
    'DABUR',
    'DALBHARAT',
    'DEEPAKNTR',
    'DELTACORP',
    'DIVISLAB',
    'DIXON',
    'DLF',
    'DRREDDY',
    'EICHERMOT'
]
tickerSymbol.forEach(symbol => {
    nseIndia.updateTodaysHistoricData(symbol)
        .then(response => {
            nseIndia.updateSecurityWiseArchives(symbol)
                .then(response => {
                    nseIndia.updateDerivativesInformation(symbol)
                        .then(response => {

                        })
                        .catch(error => {

                        })
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })

})











// function lastSunday(year, month) {
//     var date = new Date(year,month,1,12);
//     let weekday = date.getDay();
//     let dayDiff = weekday===4 ? 7 : weekday;
//     let lastSunday = date.setDate(date.getDate() - dayDiff);
//     return date.toDateString();
// }




// app.listen(3000,()=>console.log("Listening on port 3000..."))
