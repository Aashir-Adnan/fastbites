

const path = require('path');
const fs = require('fs');
const mega = require('megajs');





const loginToStorage = async (email, password) => {
    const storage = new mega({
        email,
        password,
    });

    return new Promise((resolve, reject) => {
        storage.login(error => {
            if (error) {
                console.log('An error occurred during login: ' + error.message);
                reject({ status: 500, message: "An error occurred while connecting to Mega" });
            } else {
                resolve(storage);
            }
        });
    });
};

const getTemporaryUrl = (storage, filePath) => {
    return new Promise((resolve, reject) => {
        const file = storage.navigate(filePath);
        if (!file) {
            console.log('File not found');
            reject({ status: 404, message: "File not found" });
        }

        file.link((err, link) => {
            if (err) {
                console.log('Error generating temporary link: ' + err.message);
                reject({ status: 500, message: "An error occurred while generating the temporary link" });
            } else {
                resolve({ status: 200, message: "Temporary link generated successfully", link });
            }
        });
    });
};

const getFile = async (model, req) => {
    // try {
    //     const { filePath, attachedFileIdentifier } = await getEntryFromModel(model, req);
    //     const storage = await loginToStorage(req.body.email, req.body.password);
    //     return await getTemporaryUrl(storage, filePath);
    // } catch (error) {
    //     console.log('An error occurred:' + error.message);
    //     return { status: 500, message: "An error occurred while processing the request" };
    // }
};





module.exports = {
    getFile
};