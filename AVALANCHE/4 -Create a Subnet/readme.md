### Create a SUBNET
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



> Create  Address | <method:platform>
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```



> Check the list of address
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "addresses":[
            "P-local1krpfnjj6ruxgfkk8xq2se5ppd9jc53we0pueq6",
            "P-local1zur3l5lwe478rv6w806w77fdsywka90uw0363n",
            "P-local1a5qwurccvtltr8kunttt9hvd7ck84zdpt3ahdh",
            "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
            "P-local1u8prly87zf7x0ylcz8fulpknxr05c75ljr42ma",
            "P-local1up6s5x807206g0pgje49vq02mheels7cwgxau4",
            "P-local1qt8f87yzf2mc3k736ajrlmfuvm544ssm4r0eyu",
            "P-local1wpgcgfzrw7p8e40rflapgppfsh9e4m7hadeh02",
            "P-local1nhkhzxku23nu3w8ynhsgpr2rpj2kymnks5gsqz"
            ]
            },
            "id":1
}
```

> Import private key
```bash
$ curl --location --request POST 'localhost:9650/ext/platform' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.importKey",
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
{"jsonrpc":"2.0","result":{"address":"P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"},"id":1}
```

> Create Subnet
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-local1krpfnjj6ruxgfkk8xq2se5ppd9jc53we0pueq6",
            "P-local1zur3l5lwe478rv6w806w77fdsywka90uw0363n"
        ],
        "threshold":2,
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"txID":"2pLtovuUbejogVRvsRM8pqr2EgdTQP8UgrnMGM1m3S4qhPZhdN","changeAddr":"P-local1krpfnjj6ruxgfkk8xq2se5ppd9jc53we0pueq6"},"id":1}
```
> Get All Subnets that exist
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "subnets":[{
            "id":"2pLtovuUbejogVRvsRM8pqr2EgdTQP8UgrnMGM1m3S4qhPZhdN",
            "controlKeys":[
                "P-local1zur3l5lwe478rv6w806w77fdsywka90uw0363n",
                "P-local1krpfnjj6ruxgfkk8xq2se5ppd9jc53we0pueq6"
                ],
                "threshold":"2"
                },
                {
                "id":"11111111111111111111111111111111LpoYY",
                "controlKeys":[],"threshold":"0"
                }
                ]},"id":1
}
```
> Check info of the Subnets
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["2pLtovuUbejogVRvsRM8pqr2EgdTQP8UgrnMGM1m3S4qhPZhdN"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "subnets":[{
            "id":"2pLtovuUbejogVRvsRM8pqr2EgdTQP8UgrnMGM1m3S4qhPZhdN",
            "controlKeys":[
                "P-local1zur3l5lwe478rv6w806w77fdsywka90uw0363n",
                "P-local1krpfnjj6ruxgfkk8xq2se5ppd9jc53we0pueq6"
                ],
                "threshold":"2"}]},
                "id":1
}
```
### DONE