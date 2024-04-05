// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Notarization registry
 * @notice Use this contract to notarify information
 * @author Alessandro Morandi <a.morandi.info@gmail.com>
 */
contract NotarizationRegistry {

    struct NotarizationDoc {
        string sha256hash;
        string ipfshash;
        string ipfslink;
        address sender;
        uint256 timestamp;
    }

    mapping(uint256 => NotarizationDoc) internal docHistory;
    mapping(address => uint256[]) internal senderDocs;

    mapping(string => uint256) internal sha256Hashes;
    mapping(string => uint256) internal ipfsHashes;


    uint256 public DocCount = 0;

    event CreatedNewNotarizationDocEvent(
        string  sha256hash,
        address indexed sender,
        string  indexed ipfshash,
        string  indexed ipfslink
    );

    function createNotarizationDoc(
        string memory _sha256hash,
        string memory _ipfshash,
        string memory _ipfslink
    ) public {

        DocCount++;
        docHistory[DocCount] = NotarizationDoc(
            _sha256hash,
            _ipfshash,
            _ipfslink,
            msg.sender,
            block.timestamp
        );
        senderDocs[msg.sender].push(DocCount);

        ipfsHashes[_ipfshash] = (DocCount);

        sha256Hashes[_sha256hash] = (DocCount);



        emit CreatedNewNotarizationDocEvent(
            _ipfshash,
            msg.sender,
            _sha256hash,
            _ipfslink
        );
    }

    function getDocCount() public view returns (uint256) {
        return DocCount;
    }



    function getDocById(uint256 _index) public view returns (NotarizationDoc memory) {
        require(_index <= DocCount, "Index is not valid. Must be < max doc history array lenght");
        require(_index > 0, "Index is not valid. Must be > 0 ");
        NotarizationDoc memory doc = docHistory[_index];
        return doc;
    }

    function getDocsByAddress(address _sender) public view returns (uint256[] memory) {
        return senderDocs[_sender];
    }

    function getDocBySha256Hash(string  calldata _sha256hash) public view returns (uint256 ) {
        return sha256Hashes[_sha256hash];
    }

    function getDocByIpfsHash(string  calldata _ipfshash) public view returns (uint256  ) {
        return ipfsHashes[_ipfshash];
    }

}