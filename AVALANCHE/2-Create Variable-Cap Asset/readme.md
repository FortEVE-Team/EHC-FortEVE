### Create a Variable Cap Asset

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
> Send Asset
```bash
$  curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username": "Fort__EVE",
        "password": "forteveteam",
        "assetID" : "AVAX",
        "amount"  : 12345,
        "to"      :"X-local1aygs0qjw0d0pjtthw09uln4apevuf9j4efskp2"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X   
```
>> Result
```bash
{
    "jsonrpc":"2.0",
    "result":{
        "txID":"d9B8kFvW4zDoX81PgBKkcmoQzLEKcQaGENmsiexkPMzKKopzD","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"
        },"id":1
}
# We Will Use ChangeAddr as (from) for Variabe Cap Asset
```
> Create Variable Cap Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"FORT EvE",
        "symbol":"FEVE",
        "minterSets":[
            {
                "minters": [
                    "X-local1wya7l3cm7thweckg3agr9uck68h0x6d3ulwq0q"
                ],
                "threshold": 1
            },
            {
                "minters": [
                "X-local1a67550hgdgya77sdrdmkrsuunpx2w5ed0m3ap3",
                "X-local1e4yfhrzlzlsqnqs5gw046rv6pwpdrwkuu07ljm",
                "X-local1s7agryav9vmurnzxgfe78sn7z5su8ynzqt49d0"
                ],
                "threshold": 2
            }
        ],
        "from":["X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"],
        "changeAddr":"X-local1kazvx2u9c6ncvwk9vqqck00wtz549fxhlex3da",
        "username": "Fort__EVE",
        "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

>> Result
```bash
{
    "jsonrpc":"2.0",
    "result":{
        "assetID":"oxAt8HtSnATrq9TKLqcHdMd2ibVqZrECo9YAYEFCF5cCY8oq5","changeAddr":"X-local1kazvx2u9c6ncvwk9vqqck00wtz549fxhlex3da"
        },"id":1
}
```
> Send Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":1234567,
        "assetID":"oxAt8HtSnATrq9TKLqcHdMd2ibVqZrECo9YAYEFCF5cCY8oq5",
        "to":"X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99",
        "username": "Fort__EVE",
        "password": "forteveteam"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"txID":"M6XAhgvKLNqba3BYPeTju1ocX4ywyqJQrEPnYaga2et38LtwX","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"},"id":1}
```
> Check Balance
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99",
        "assetID":"oxAt8HtSnATrq9TKLqcHdMd2ibVqZrECo9YAYEFCF5cCY8oq5"
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
        "balance":"1234567","utxoIDs":[{
            "txID":"M6XAhgvKLNqba3BYPeTju1ocX4ywyqJQrEPnYaga2et38LtwX",
            "outputIndex":2}]},"id":1
}
```

> Send Assets
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username": "Fort__EVE",
        "password": "forteveteam",
        "assetID" :"oxAt8HtSnATrq9TKLqcHdMd2ibVqZrECo9YAYEFCF5cCY8oq5",
        "amount"  : 456,
        "to"      :"X-local1t5fkwxjzcj9p9lk8hd5s7s9hpj92eg66krallz"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
> Check Balance of the Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-local1t5fkwxjzcj9p9lk8hd5s7s9hpj92eg66krallz",
        "assetID":"oxAt8HtSnATrq9TKLqcHdMd2ibVqZrECo9YAYEFCF5cCY8oq5"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash

>> Result
{"jsonrpc":"2.0","result":{"balance":"456","utxoIDs":[{"txID":"YMHd3fNPGJehA4JxXpZ1CcPVEwJt32vYWsgE1xm9hY4fCg2zA","outputIndex":0}]},"id":1}
```

### DONE