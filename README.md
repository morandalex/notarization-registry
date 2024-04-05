# Notarize documents in a folder  

## Prerequites 

on a machine that can run bash script ( use mac or ubuntu or wsl )
- install make
- install node 18

download/install metamask in teh browser and assusre that you have  polygon network and some matic to make the transaction ( the transaction costs at the time of writing 0.08$ )

## install 

    npm install

then setup .env with infura credentials to upload files to ipfs

## how to use 

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
    
    _ipfslink   : https://moneyviz-notarify.infura-ipfs.io/ipfs/QmRizhWydaidoPUSeL5xs2RmLaqQqM698rNHbjUCwhiiCm
    
    _sha256hash : fc03b2cc12a4c0c42c1d6136e0def019ac4c3102d15e06ff6173f37cc7d3350b


confirm the transaction

save the link for the transaction , i.e  https://polygonscan.com/tx/0x0053dcbc1f8d4061897af1256ea533a4001119561aca84c6b56505840276a0df

now give to the client 

- the zip of the result folder 
- the tx link

to see the data 


