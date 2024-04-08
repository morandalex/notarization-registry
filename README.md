# Notarize documents of a folder into a Notarization Registry deployed on polygon network  


you will gate 

now you have 

- a zip with files with sha256 string the represent the tamper proof of the files
- the tx link so you have the timestamp of the tamper proof

## Prerequites 

on a machine that can run bash script ( use mac or ubuntu or wsl )
- install make
- install node 18 ( tip: use nvm eventually to manage the node versions)
- an account with infura
- a wallet metamask to deply a contract and interact with NotarizationRegistry deployed 
- understand how to deploy a contract with thirdweb ( really simple )

Download/install metamask in the browser and assure that you have  polygon network and some matic to make the transaction ( the transaction costs at the time of writing 0.08$ )

## Install 

    npm install

Then setup .env with infura credentials to upload files to ipfs

## How to use 

Copy the folder you want to notarize in the root of this project 

Rename the folder with files with the name of the client or the id of he client or whatever id you need

Add the folder to gitignore

Modify the make file with the name of the flder you added ( now is test , change test with the name of the folder)


then 

    make run

then 

copy the transaction parameters that you see in transaction-parameters.txt

then go on the write contract page of the notarization contract already deployed, here the link :
https://polygonscan.com/address/0x8F50a47E95E47acD490D3a161408edf0C3c84a43#writeContract

in this page connect to the contract clicking on "Connect to web3" button

then create a transaction filling the function `createNotarizationDoc` with the following inputs, i.e: 


    _ipfshash   : QmRizhWydaidoPUSeL5xs2RmLaqQqM698rNHbjUCwhiiCm
    
    _ipfslink   : https://<IPFS_GATEWAY_INFURA_NAME>.infura-ipfs.io/ipfs/QmRizhWydaidoPUSeL5xs2RmLaqQqM698rNHbjUCwhiiCm
    
    _sha256hash : fc03b2cc12a4c0c42c1d6136e0def019ac4c3102d15e06ff6173f37cc7d3350b


confirm the transaction

save the link for the transaction , i.e  https://polygonscan.com/tx/0x0053dcbc1f8d4061897af1256ea533a4001119561aca84c6b56505840276a0df




# Check that data are stored in transaction correctly

teh data are stored as input in the calldata of the transaction and you can get that the data are inside in what is called "calldata"

go in the main page of the transaction 

click decode input data on the scan
![image](https://github.com/morandalex/notarization-registry/assets/9484568/f3110fa9-d7d2-4c92-9599-8df2bf7ad58e)

![image](https://github.com/morandalex/notarization-registry/assets/9484568/98d0db9f-ca05-4fbe-9f56-aca43ff7b668)

alternatively you can copy the "calldata" and parse here https://tools.deth.net/calldata-decoder
![image](https://github.com/morandalex/notarization-registry/assets/9484568/800d52d7-7068-41d8-a8ba-c0e7cff7d9e0)

you copy the calldata that is something like

that copy the calldata of the transaction the form of 
```
0x4572a7dc000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000004066633033623263633132613463306334326331643631333665306465663031396163346333313032643135653036666636313733663337636337643333353062000000000000000000000000000000000000000000000000000000000000002e516d52697a685779646169646f505553654c35787332526d4c617151714d363938724e48626a554377686969436d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005c68747470733a2f2f6d6f6e657976697a2d6e6f7461726966792e696e667572612d697066732e696f2f697066732f516d52697a685779646169646f505553654c35787332526d4c617151714d363938724e48626a554377686969436d00000000

```

then copy the following  "ABI"  used to start the transaction 
```
[  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_sha256hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfshash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfslink",
        "type": "string"
      }
    ],
    "name": "createNotarizationDoc",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
```
click to decode and you will get back the inputs
![image](https://github.com/morandalex/notarization-registry/assets/9484568/74e2e237-60e9-426a-ac7b-722dc110ec4c)






