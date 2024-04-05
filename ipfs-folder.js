const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const path = require('path');
const dotenv = require ('dotenv')
dotenv.config()


// Your INFURA project credentials
const INFURA_PROJECT_ID     = process.env.INFURA_PROJECT_ID
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET

const IPFS_GATEWAY_URL      = process.env.IPFS_GATEWAY_URL

const URL                   = 'https://ipfs.infura.io:5001/api/v0/add';


// Encode your project ID and secret for the Authorization header
const base64Credentials = Buffer.from(`${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`).toString('base64');

// Construct the headers object
const HEADERS = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Basic ${base64Credentials}`
};



// Helper function to determine if a file is text based on its extension
function isTextFile(filename) {
    const textExtensions = ['.txt', '.csv'];
    const ext = path.extname(filename).toLowerCase();
    return textExtensions.includes(ext);
}

function getFileExtension(filename) {
    return ext = path.extname(filename).toLowerCase();
}

// Function to encode file content to base64
function encodeToBase64(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
}

// Function to calculate SHA-256 hash
function calculateSHA256(content) {
    const hash = crypto.createHash('sha256');
    hash.update(content);
    return hash.digest('hex');
}

// Function to upload content to IPFS, assuming IPFS endpoint expects base64 content
async function uploadToIPFS(base64Content) {
    const response = await axios.post(URL, { filedata : base64Content }, { headers: HEADERS });
    console.log(IPFS_GATEWAY_URL+response.data.Hash )
    return response.data.Hash; // Adjust depending on the API response structure
}

// Main function to process files in the given directory
async function processFiles(directoryPath) {
    const summary = [];
    const download = [];
    const transactionParameters = [];
    transactionParameters.push (`Informazioni per marca temporale su blockchain: \n`)
   
  
    async function processDirectory(dirPath) {
      const files = await fs.promises.readdir(dirPath);
  
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = await fs.promises.stat(filePath);
  
        if (stats.isDirectory()) {
          // Recursively process subdirectory
          await processDirectory(filePath);
        } else {
          try {
            let content;
            let base64Content;
            let sha256Hash;
            let ipfsHash;
  
            if (isTextFile(file)) {
              content = await fs.promises.readFile(filePath, 'utf8');
              sha256Hash = calculateSHA256(content);
              base64Content = content;
            } else {
              base64Content = await fs.promises.readFile(filePath, 'base64');
              sha256Hash = calculateSHA256(base64Content);
            }
            if (filePath == "result/sha256-file-list.txt" || filePath == "result/folder-tree.txt" ) {

              ipfsHash = await uploadToIPFS(base64Content);
              //${sha256Hash} 
              //${getFileExtension(file)}
              summary.push(`${ipfsHash} ${IPFS_GATEWAY_URL+ipfsHash} ${filePath}`);

              download.push(`<a href="${IPFS_GATEWAY_URL+ipfsHash}" download="${filePath.split('/')[1]}">Ipfs Link to ${filePath.split('/')[1]}</a><br>`);
            }

            if(filePath == "result/sha256-file-list.txt"){
              transactionParameters.push (`_ipfshash   : ${ipfsHash}`)
              transactionParameters.push (`_ipfslink   : ${IPFS_GATEWAY_URL+ipfsHash}`)
            }


          
          } catch (err) {
            console.error(`Error processing ${filePath}:`, err);
          }
        }
      }
    }
  
    await processDirectory(directoryPath);
  
    // Write the summary to a file in the directory
    await fs.promises.writeFile('ipfs-hash-table.txt', summary.join('\n'));


    download.push(
    `
    <button onclick="downloadFiles()">Download Files</button>
    <script>
      async function downloadFile(url, filename) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      }

      function downloadFiles() {
        const links = document.getElementsByTagName('a');
        for (const link of links) {
          const url = link.href;
          const filename = link.download;
          downloadFile(url, filename);
        }
      }
    </script>
    `
    )


    await fs.promises.writeFile('download-ipfs-file.html', download.join('\n'));
    await fs.promises.writeFile('transaction-parameters.txt', transactionParameters.join('\n'));
  }



// Start processing the directory
processFiles('result')
    .then(() => console.log('Processing complete.'))
    .catch(console.error);
