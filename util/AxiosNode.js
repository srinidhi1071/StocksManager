const { default: axios } = require("axios")
var fileName = "AxiosNode.js"

function axiosCall(request) {
    return new Promise((resolve, reject) => {
        try {
            axios(request)
                .then(response => {
                    console.log(`['${fileName}']: AxiosCall - Success: ${JSON.stringify(response.status)}`)
                    resolve(response)
                })
                .catch(error => {
                    console.log(`['${fileName}']: AxiosCall - Failed: ${JSON.stringify(error.message)}`)
                    reject({ statusCode: error.response.status, body: error.message })
                })
        }
        catch (error) {
            console.log(`['${fileName}']: AxiosCall - Failed with Error: ${error}`)
            reject({ statusCode: 500, body: error })
        }
    })
}

module.exports = {
    axiosCall
}