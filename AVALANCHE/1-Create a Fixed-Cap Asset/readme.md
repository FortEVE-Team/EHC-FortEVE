### Create a Fixed Cap Asset

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
            "X-local1kazvx2u9c6ncvwk9vqqck00wtz549fxhlex3da"]
            },"id":1
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
<<-- we will use this address as (from) -->>
```


> Create Fixed Cap Asset
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "FortEVE",
        "symbol":"EVE",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8",
                "amount": 10010001
            }
        ],
        "from":["X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"],
        "changeAddr":"X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99",
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
        "assetID":"2KT5prfzExb9GpyDMywmHTDxvtCaiP717yW1zHihXdPEr92oi3","changeAddr":"X-local17zxh9a7puajtzcyhhytavdwxdxenkqmeqqtu99"
        },"id":1
}
```


> Check Balance
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8",
        "assetID":"2KT5prfzExb9GpyDMywmHTDxvtCaiP717yW1zHihXdPEr92oi3"
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
        "balance":"10010001",
        "utxoIDs":[{
            "txID":"2KT5prfzExb9GpyDMywmHTDxvtCaiP717yW1zHihXdPEr92oi3",
            "outputIndex":1}
            ]},"id":1
}
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
        "assetID" :"2KT5prfzExb9GpyDMywmHTDxvtCaiP717yW1zHihXdPEr92oi3",
        "amount"  : 123,
        "to"      :"X-local1t5fkwxjzcj9p9lk8hd5s7s9hpj92eg66krallz"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X   
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "txID":"cas12TgPHCZgpr21ifqhZXrvoPGvqjaMsstMnaUKfasqC6QXF","changeAddr":"X-local1yhgju8ynp8s3mpcaxy0g76qu3dm7af3vzrksw8"
        },"id":1
}
```



> Check Transaction Status
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"cas12TgPHCZgpr21ifqhZXrvoPGvqjaMsstMnaUKfasqC6QXF"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"status":"Accepted"},"id":1}
```



> Check Balance of Address
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-local1t5fkwxjzcj9p9lk8hd5s7s9hpj92eg66krallz",
        "assetID":"2KT5prfzExb9GpyDMywmHTDxvtCaiP717yW1zHihXdPEr92oi3"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

```bash
>> Result
{"jsonrpc":"2.0","result":{"balance":"123","utxoIDs":[{"txID":"cas12TgPHCZgpr21ifqhZXrvoPGvqjaMsstMnaUKfasqC6QXF","outputIndex":0}]},"id":1}
```
### DONE
