const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()

const URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const JWT = process.env.PINATA_SECRET_KEY;
const HEADERS = {
    'Authorization': `Bearer ${JWT}`
};

async function uploadToIPFS() {
    const text = "Hello World!";
    const blob = new Blob([text], {type: "text/plain"});
    const data = new FormData();
    data.append("file", blob);

    try {
        const response = await axios.post(URL, data, {headers: HEADERS});
        console.log(response.data.IpfsHash)
    } catch (e) {
        console.error(e)
    }
}

uploadToIPFS ()

async function pinFileToIPFS() {
    try {
        const text = "Hello World!";
        const blob = new Blob([text], {type: "text/plain"});
        const data = new FormData();
        data.append("file", blob);

        const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
                body: data
            }
        );
        const resData = await res.json();
        console.log(resData);
    } catch (error) {
        console.log(error);
    }
};