### Create NFT

### Install and run Avash node
##### Frist Terminal

```bash
$ cd $GOPATH/src/github.com/ava-labs/avash
$ ./avash
$ runscript scripts/five_node_staking.lua
```
##### Second Terminal
> Check Bootstrapped Info
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```



> Create Keystore 
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "keystore.createUser",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```



> Create  Address
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username": "Fort__EVE",
        "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```



> Check the list of address
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.listAddresses",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "addresses":[
            "X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8",
            "X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99",
            "X-local1t5fkwxjzcj9p9lk8hd5s7s9hpj92eg66krallz",
            "X-local1kazvx2u9c6ncvwk9vqqck00wtz549fxhlex3da",
            "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
            "X-local1a67550hgdgya77sdrdmkrsuunpx2w5ed0m3ap3",
            "X-local1e4yfhrzlzlsqnqs5gw046rv6pwpdrwkuu07ljm",
            "X-local1s7agryav9vmurnzxgfe78sn7z5su8ynzqt49d0",
            "X-local1wya7l3cm7thweckg3agr9uck68h0x6d3ulwq0q",
            "X-local1aygs0qjw0d0pjtthw09uln4apevuf9j4efskp2"
            ]},
            "id":1
}
```

> Import private key
```bash
$ curl --location --request POST 'localhost:9650/ext/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "avm.importKey",
    "params":{
        "username": "Fort__EVE",
        "password": "forteveteam",
          "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    },
    "id": 1
}'
```
>> Result
```bash
{"jsonrpc":"2.0","result":{"address":"X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"},"id":1} 
```


> Create NFT Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"fortNFT",
        "symbol":"FNFT",
        "minterSets":[
            {
                "minters": [
                    "X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"
                ],
                "threshold": 1
            }
        ],
        "username": "Fort__EVE",
        "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"assetID":"2H8iTtWniUNaESUvENAixaQ9xdUpJkXsSRJe4rVuBBpNkTdEen","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"},"id":1}
```
> Get UTXOs for NFT
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"]
    },
    "username": "Fort__EVE",
    "password": "forteveteam"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "numFetched":"4",
        "utxos":[
            "11CCZQwLohqAxTkSdJ6CUqhv7DzVF3mwJ5LYcm7mkWoMJmDPeCkiqGBbuFMceTER7YKMVgjkeHkC2tG63TEN6vER84CKNQD4g6LXBmudgZGTE4FwNPkw7JgGxFVZz8xUcRQWyVTQpuwSUoGrCeeEaxKnhqtagoVhDbgcJW","11AsGbeKoY9oBZXv9ia9g5c4XnaKHcdAKDgtJga25obkkMDXsbay9AZ2uqfUPhsUthcgzM7ygcepCFR3MFkHnzubmhsbC1k7YFyjZA2f9oYJMsRwnMKyvh4MQ9BJWRC5E788ES1MAzH3Z7nnAw3MxLTkqP5uEHzbQMjxCk","11QLFQEL6EU3dYrwBroMqBVGLWRVQCPcAbaX2jjhjn8LBAzQWKMSbBiozbWKdGugCfeXq8q372Pu38KTzNcZCuPMfHe16eZ3iH4uPF9apcWuogLi6KTpTaRBmSY3GCv9iMZM2uDGvS3AiYXz6vQCU7eQ8enFYMz31v21Pj","114ZobWHyQfygp3vMFxxrdgxFi5ovkRcqBosrZXkKL4oWtJhhStUHmc9bTe2ADYmmPJ7yM1RmCgwBuLbFZcE9BxFLGY561mM8x2xgfz8AtR9SHrLLvWAtkox1JFjhrw3kVWwwNPyhWPTMSZweJY2H5WoFb51yRbGT"
            ],
            "endIndex":{
                "address":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8",
                "utxo":"2kjtCNCFXSnSN3biBm4C8Hu13uUFt58dMXKroYM3jsvXs8Hqb9"
                },
                "encoding":"cb58"
                },
                "id":1
}
```
> Mint the Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2H8iTtWniUNaESUvENAixaQ9xdUpJkXsSRJe4rVuBBpNkTdEen",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99",
    "username": "Fort__EVE",
    "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"txID":"AVo2LdHonhry9ZxtZr1qPNG4NBAwFM2uGYog9sQfVbmnoZPc5","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"},"id":1}
```
> Get UTXOs for NFT Mint
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"]
    },
    "username": "Fort__EVE",
    "password": "forteveteam"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "numFetched":"3",
        "utxos":[
            "11CCZQwLohqAxTkSdJ6CUqhv7DzVF3mwJ5LYcm7mkWoMJmDPeCkiqGBbuFMceTER7YKMVgjkeHkC2tG63TEN6vER84CKNQD4g6LXBmudgZGTE4FwNPkw7JgGxFVZz8xUcRQWyVTQpuwSUoGrCeeEaxKnhqtagoVhDbgcJW","113zMN9KknSwim6ZvyhABUbq6F5AoV5drGDBy2KAiGxLXSeHTXY5MWLYx5rruRXXtKRfr8adC6gSgUJZ8yGDU3D7nFzq8qC2zLNz4xP2ykRYpYvit8y9o1Vb3okG8sGCref1hqNdjarWrms34ZMsu7bTthkiVX3gHkQJHm","11AsGbeKoY9oBZXv9ia9g5c4XnaKHcdAKDgtJga25obkkMDXsbay9AZ2uqfUPhsUthcgzM7ygcepCFR3MFkHnzubmhsbC1k7YFyjZA2f9oYJMsRwnMKyvh4MQ9BJWRC5E788ES1MAzH3Z7nnAw3MxLTkqP5uEHzbQMjxCk"
            ],
            "endIndex":{
                "address":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8","utxo":"274whtMtrwKXfPCxmNjcFgG7w2TGyeWXfpoxPvTifBHjkF4HSy"
                },
                "encoding":"cb58"
                },
                "id":1
}
```
> Send NFT
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2H8iTtWniUNaESUvENAixaQ9xdUpJkXsSRJe4rVuBBpNkTdEen",
        "to"      :"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8",
        "groupID" : 0,
        "username": "Fort__EVE",
        "password": "forteveteam"
    }

}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "txID":"e6MUZjUAJwmRj9sBu6Gxkpehf122i4JTVqguM5nw4GDtnV7ek","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"
        },
        "id":1
    }
```
### DONE
