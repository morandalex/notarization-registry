    const  axios = require ('axios')
    const dotenv = require ('dotenv')
    dotenv.config()


    const INFURA_PROJECT_ID     = process.env.INFURA_PROJECT_ID
    const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET

    const IPFS_GATEWAY_URL      = process.env.IPFS_GATEWAY_URL

    const URL                   = 'https://ipfs.infura.io:5001/api/v0/add';



   
    // Define the base64 encoding function
    function base64Encode(str) {
        return Buffer.from(str).toString('base64');
    }


    async function run (strToIpfs){

    
    let projectid = INFURA_PROJECT_ID
    let projectsecret = INFURA_PROJECT_SECRET
    let obj = {}
    //console.log(base64Encode(projectid + ":" + projectsecret))
    try {
        let headers = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Basic ' + base64Encode(projectid + ":" + projectsecret),
            }
        };
        let data = {
            'filedata': strToIpfs
        }
        const response = await axios.post(URL, data, headers);

        //console.log(response.data);
        let res = response.data;

        obj = {
                hash : response.data.Hash,
                link: IPFS_GATEWAY_URL + response.data.Hash
        }

    } catch (error) {
        console.error(error);
        obj = error
    }

    return obj 


}

let strToIpfs = 'hello';
// Call the run function

// Wrap the call in an async function
async function main() {
    try {
        let strToIpfs = 'hello';
        let obj = await run(strToIpfs);
        console.log(obj);
    } catch (error) {
        console.error(error);
    }
}

// Call the main function to execute
main();