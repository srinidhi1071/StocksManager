"use strict"
var AWS = require("aws-sdk");
const fileName = "docdb.js"

module.exports = class DocDB {

    constructor(accessKeyId, secretAccessKey, endpoint) {
        this.awsConfig = {
            "region": "us-east-1",
            "endpoint": endpoint,
            "accessKeyId": accessKeyId, "secretAccessKey": secretAccessKey
        };

    }

    getDbClient() {
        this.dynamoClient = null;
        if (this.dynamoClient == null || this.dynamoClient == undefined) {
            AWS.config.update(this.awsConfig);
            this.dynamoClient = new AWS.DynamoDB.DocumentClient();
            return Promise.resolve(this.dynamoClient)
        }
        return Promise.resolve(this.dynamoClient)
    }

    findAll(params) {
        return new Promise((resolve, reject) => {
            this.getDbClient()
                .then(db => {
                    db.scan(params, function (err, data) {
                        if (err) {
                            console.log(`${fileName}: findAll - Error during findAll Scan operation`);
                            reject(err)
                        }
                        else {
                            console.log(`${fileName}: findAll - Successfully completed findAll operation`);
                            resolve(data)
                        }

                    })

                })
                .catch(error => {
                    console.log(`${fileName}: findAll - Error during findAll operation`)
                    reject(error)
                })
        })
    }

    findOne(params) {
        return new Promise((resolve, reject) => {
            this.getDbClient()
                .then(db => {
                    db.get(params, function (err, data) {
                        if (err) {
                            console.log(`${fileName}: findOne - Error during findOne get operation`);
                            reject(err)
                        }
                        else {
                            console.log(`${fileName}: findOne - Successfully completed findOne operation`);
                            resolve(data)
                        }

                    })

                })
                .catch(error => {
                    console.log(`${fileName}: findOne - Error during findOne operation`)
                    reject(error)
                })

        })
    }

    find(params) {
        return new Promise((resolve, reject) => {
            this.getDbClient()
                .then(db => {
                    db.scan(params, function (err, data) {
                        if (err) {
                            console.log(`${fileName}: find - Error during find get operation`);
                            reject(err)
                        }
                        else {
                            console.log(`${fileName}: find - Successfully completed find operation`);
                            resolve(data)
                        }

                    })

                })
                .catch(error => {
                    console.log(`${fileName}: findOne - Error during findOne operation`)
                    reject(error)
                })

        })
    }

    insertOne(params) {
        return new Promise((resolve, reject) => {
            this.getDbClient()
                .then(db => {
                    db.put(params, function (err, data) {
                        if (err) {
                            console.log(`${fileName}: insertOne - Error during insertOne operation`);
                            reject(err)
                        }
                        else {
                            console.log(`${fileName}: insertOne - Successfully completed insertOne operation`);
                            resolve(data)
                        }

                    })
                })
                .catch(error => {
                    console.log(`${fileName}: insertOne - Error during insertOne operation`)
                    reject(error)
                })
        })
    }



    // let fetchOneByKey = function () {
    //     var params = {
    //         TableName: "stock_manager_dev",
    //         FilterExpression: "#symb = :sym",
    //         ExpressionAttributeNames: {
    //             "#symb": "symbol",
    //         },
    //         ExpressionAttributeValues: {
    //             ":sym": "TCS"
    //         }
    //     };
    //     docClient.scan(params, function (err, data) {
    //         if (err) {
    //             console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
    //         }
    //         else {
    //             console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
    //             return (data)
    //         }

    //     })
    // }
}

