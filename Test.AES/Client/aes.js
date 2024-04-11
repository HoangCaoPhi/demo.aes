const crypto = require('crypto')
var CryptoJS = require("crypto-js");
const { encode } = require('querystring');

var data = {
    "Name": "Hoang Cao Phi",
    "Action": "Test"
}

const enCryptData = async (data) => {
    const jsonDataString = JSON.stringify(data);

    let iv = crypto.randomBytes(16);
    let secret_key = crypto.randomBytes(32);

    iv = CryptoJS.lib.WordArray.create(iv)
    secret_key = CryptoJS.lib.WordArray.create(secret_key)
 
    var cipherText = CryptoJS.AES.encrypt(jsonDataString, secret_key, {
        iv: iv
    })

    iv = CryptoJS.enc.Base64.stringify(iv)
    secret_key = CryptoJS.enc.Base64.stringify(secret_key)

    console.log(cipherText.toString())
    console.log(iv)
    console.log(secret_key)
}

 
enCryptData(data)