const CryptoJS = require('crypto-js');


const adjustKeyLength = (key, targetLength = 32) => {
    if (key.length > targetLength) {
        
        return key.slice(0, targetLength);
    } else if (key.length < targetLength) {
        
        return key.padEnd(targetLength, '0');
    }
    return key; 
};


const encryptObject = (object, key) => {
    const adjustedKey = adjustKeyLength(key); 
    const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey); 
    
    const stringifiedObject = JSON.stringify(object);

    
    const encrypted = CryptoJS.AES.encrypt(stringifiedObject, encryptionKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();

    return encrypted;
};


const decryptObject = (encryptedObject, key) => {
    const adjustedKey = adjustKeyLength(key); 
    const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey); 
    
    const decrypted = CryptoJS.AES.decrypt(encryptedObject, encryptionKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedString);
    return decryptedObject;
};

module.exports = { encryptObject, decryptObject };
