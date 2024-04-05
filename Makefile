# change here "test" folder with the path of the folder you want to notarize
FOLDER=test

run:
	make clean
	tree $(FOLDER) > ./result/folder-tree.txt
	find ./$(FOLDER) -type f -exec sha256sum {} \; | sort > ./result/sha256-file-list.txt
	find ./result/sha256-file-list.txt  -exec sha256sum {} \; > ./result/sha256sum.txt
	npm run ipfs:folder && mv ipfs-hash-table.txt ./result/ && mv download-ipfs-file.html ./result/
	sha256sum ./result/sha256-file-list.txt | awk '{print "_sha256hash : "$$1}' >  tmp.txt &&  (cat transaction-parameters.txt ; echo ;  cat tmp.txt ; ) > c.txt && mv  c.txt ./result/transaction-parameters.txt && rm -f tmp.txt
	zip -r result.zip result



clean:
	rm -f ./result/download-ipfs-file.html  
	rm -f ./result/folder-tree.txt  
	rm -f ./result/ipfs-hash-table.txt 
	rm -f ./result/sha256-file-list.txt 
	rm -f ./result/sha256sum.txt 
	rm -f ./result/transaction-parameters.txt
	rm -f ./result.zip

deploy:
	cd contract && npx thirdweb deploy