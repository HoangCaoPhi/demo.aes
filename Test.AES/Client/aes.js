var CryptoJS = require("crypto-js");
var data = {
    "Name": "Hoang Cao Phi",
    "Action": "Test"
}
const base64ToArrayBuffer = (base64) => {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

const enCryptData = async (data) => {
    const jsonDataString = JSON.stringify(data);

    // let iv = crypto.randomBytes(16);
    // let secret_key = crypto.randomBytes(32);
 
    let iv = base64ToArrayBuffer("eWe3W5qvFIuJSt07WKaaVw==")
    let secret_key = base64ToArrayBuffer("47N77QrH/IfmNjKhh49I94/fV/PQbCFG8fmnlzOpiv0=")

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