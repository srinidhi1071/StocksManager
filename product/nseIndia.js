const { response } = require("express")
const axiosNode = require("../util/AxiosNode")
const excelUtil = require("../util/ExcelUtil")
const date = require('date-and-time');




function updateTodaysHistoricData(symbol) {
    let config = {
        method: 'get',
        url: 'https://www.nseindia.com/api/historical/cm/equity?symbol=' + symbol + '&series=[%22EQ%22]',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'referer': 'https://www.nseindia.com/get-quotes/equity?symbol=TCS',
        }
    }
    return new Promise((resolve, reject) => {
        try {
            getHistoricData(config, symbol)
                .then(response => {
                    let sortedResponse = response.data.sort((a, b) => {
                        return new Date(a.CH_TIMESTAMP) - new Date(b.CH_TIMESTAMP)
                    })

                    excelUtil.writeNSEHistoricDataIntoExcelFile(symbol, sortedResponse)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        }
        catch (error) {
            console.log("Error in updateTodaysHistoricData")
        }
    })

}

function getHistoricData(config, symbol) {
    return new Promise((resolve, reject) => {
        try {
            let baseCallConfig = {
                method: 'get',
                url: 'https://www.nseindia.com/get-quotes/equity?symbol=' + symbol,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                }
            }
            axiosNode.axiosCall(baseCallConfig)
                .then((resp) => {
                    let respCookies = resp.headers['set-cookie']
                    config.headers.Cookie = respCookies
                    axiosNode.axiosCall(config)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch((err) => {
                    reject(err)
                })
        }
        catch (error) {
            reject({ statusCode: 500, body: error })
        }
    })
}

function updateSecurityWiseArchives(symbol) {
    let config = {
        method: 'get',
        url: 'https://www1.nseindia.com/marketinfo/sym_map/symbolCount.jsp?symbol=' + symbol,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'referer': 'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm',
        }
    }
    return new Promise((resolve, reject) => {
        try {
            getSWAData(config, symbol)
                .then(response => {
                    excelUtil.writeSecurityWiseArchivesIntoExcelFile(symbol, response)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        }
        catch (error) {
            console.log("Error in updateSecurityWiseArchives")
        }
    })

}

function getSWAData(baseConfig, symbol) {
    return new Promise((resolve, reject) => {
        try {
            axiosNode.axiosCall(baseConfig)
                .then((resp) => {
                    let respCookies = resp.headers['set-cookie']
                    let innerConfig = {
                        method: 'get',
                        url: `https://www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol=${symbol}&segmentLink=3&symbolCount=${resp.data}&series=EQ&dateRange=day&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE`,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                            'Referer': 'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm'
                        }
                    }
                    innerConfig.headers.Cookie = respCookies
                    axiosNode.axiosCall(innerConfig)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch((err) => {
                    reject(err)
                })
        }
        catch (error) {
            reject({ statusCode: 500, body: error })
        }
    })
}


function updateDerivativesInformation(symbol) {
    let rawDate = new Date()
    let dateToday = formatDate(rawDate);
    let lastThursday = lastThursdayOfTheMonth(rawDate.getFullYear(), rawDate.getMonth() + 1)
    let lastThursdayNextMonth = lastThursdayOfTheMonth(rawDate.getFullYear(), rawDate.getMonth() + 2)
    if (dateToday > lastThursday) {
        lastThursday = lastThursdayOfTheMonth(rawDate.getFullYear(), rawDate.getMonth() + 2)
        lastThursdayNextMonth = lastThursdayOfTheMonth(rawDate.getFullYear(), rawDate.getMonth() + 3)
    }

    let config1 = {
        method: 'get',
        url: `https://www.nseindia.com/api/historical/fo/derivatives?&from=${dateToday}&to=${dateToday}&expiryDate=${lastThursday}&instrumentType=FUTSTK&symbol=${symbol}`,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'referer': 'https://www.nseindia.com/get-quotes/equity?symbol=' + symbol,
        }
    }

    let config2 = {
        method: 'get',
        url: `https://www.nseindia.com/api/historical/fo/derivatives?&from=${dateToday}&to=${dateToday}&expiryDate=${lastThursdayNextMonth}&instrumentType=FUTSTK&symbol=${symbol}`,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'referer': 'https://www.nseindia.com/get-quotes/equity?symbol=' + symbol,
        }
    }


    return new Promise((resolve, reject) => {
        try {
            getDerivativesData(config1, symbol)
                .then(response => {
                    let derivateResponse = {}
                    derivateResponse.responseOne = response.data
                    getDerivativesData(config2, symbol)
                        .then(response2 => {
                            derivateResponse.responseTwo = response2.data
                            excelUtil.writeDerivativesIntoExcelFile(symbol, derivateResponse)
                            resolve(derivateResponse)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch(error => {
                    reject(error)
                })
        }
        catch (error) {
            console.log("Error in updateTodaysHistoricData")
        }
    })

}

function getDerivativesData(config, symbol) {
    return new Promise((resolve, reject) => {
        try {
            let baseCallConfig = {
                method: 'get',
                url: 'https://www.nseindia.com/get-quotes/derivatives?symbol=' + symbol,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                }
            }
            axiosNode.axiosCall(baseCallConfig)
                .then((resp) => {
                    let respCookies = resp.headers['set-cookie']
                    config.headers.Cookie = respCookies
                    axiosNode.axiosCall(config)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch((err) => {
                    reject(err)
                })
        }
        catch (error) {
            reject({ statusCode: 500, body: error })
        }
    })
}

function formatDate(rawDate) {
    let todaysDate = date.format(rawDate, 'DD-MM-YYYY');
    return todaysDate;
}





function lastThursdayOfTheMonth(year, month) {
    var to_Date = new Date(year, month, 1, 12);
    let weekday = to_Date.getDay();
    let dayDiff = weekday > 4 ? weekday - 4 : weekday + 3;
    to_Date.setDate(to_Date.getDate() - dayDiff);
    return date.format(to_Date, "DD-MMM-YYYY")
    // return to_Date.toDateString();
}

module.exports = {
    updateTodaysHistoricData,
    updateSecurityWiseArchives,
    updateDerivativesInformation
}