### Create a New Blockchain
##### 


> • Add Validators to the Subnet 

> • Create the Genesis Data 

> • Create the Blockchain 

> • Interact With the New Blockchain 

### Install and run Avash node
##### Frist Terminal

```bash
 cd $GOPATH/src/github.com/ava-labs/avalanchego
 ./build/avalanchego --network-id=fuji
<!--  -->
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



> Create  Address | platform
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

> List Address
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "addresses":[
            "P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8",
            "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c",
            "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn",
            "P-local145z00lmjtlturfkzz2t4ynedekx7tmdh6nsv40",
            ]
            },
            "id":1
}
```
> Import private key
```bash
$ curl --location --request POST 'localhost:9650/ext/P' \
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



> Add Validator
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "stakeAmount":2000000000000,
        "rewardAddress":"P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8",
        "changeAddr": "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c",
        "delegationFeeRate":10,
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```
```bash
>> Result
{"jsonrpc":"2.0","result":{"txID":"jtXEaWx3f61Swqyp3CqZagfnvK1VaYFEqTtK5nwEQzFcAgvLM","changeAddr":"P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c"},"id":1}
```

> Check Status
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"YUq15TqCb7qKkj2TD7Pr623ttwgXB6E2NwQGHzTy9PxAxjGeH"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```bash
>> Result
{"jsonrpc":"2.0","result":"Committed","id":1}
```

> Get pending Validator
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```



```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
    "validators":[{
        "txID":"YUq15TqCb7qKkj2TD7Pr623ttwgXB6E2NwQGHzTy9PxAxjGeH",
        "startTime":"1608301036",
        "endTime":"1610892436",
        "stakeAmount":"2000000000000",
        "nodeID":"NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
        "delegationFee":"10.0000",
        "connected":false,
        "delegators":null
        }],
        "delegators":[]},"id":
}
```

> Create Subnet
```bash

$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c",
            "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn"
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
{
    "jsonrpc":"2.0",
    "result":{
        "txID":"2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1","changeAddr":"P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8"
        },
        "id":1
}
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
            "id":"2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1",
            "controlKeys":[
                "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn",
                "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c"
                ],
                "threshold":"2"
                },
                {
                    "id":"11111111111111111111111111111111LpoYY",
                    "controlKeys":[],"threshold":"0"}]},
                    "id":1
}
```
> Check info of the Subnets
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "subnets":[{
            "id":"2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1",
            "controlKeys":[
                "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn",
                "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c"
                ],
                "threshold":"2"}]},
                "id":1
}
```

<!-- 
            "P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8",//
            "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c",
            "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn",
            "P-local145z00lmjtlturfkzz2t4ynedekx7tmdh6nsv40", -->

> Adding a Subnet Validator
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-FxAVkwgjZorPg8SQdQEmZtSjkoLTbfhTN",
        "subnetID":"2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":1,
        "changeAddr": "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```bash
>> Result
{
    "jsonrpc":"2.0",
    "result":{
        "txID":"a3ThQ355b2QgcoMFndF2QFoj7Q3dBFVYSa9Phstwpt9RkfcxF","changeAddr":"P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
        },
        "id":1
}
```
```bash

$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-FxAVkwgjZorPg8SQdQEmZtSjkoLTbfhTN",
                "startTime": "1608301036",
                "endTime": "1610892436",
                "weight": "1"
            }
        ]
    },
    "id": 1
}
```


> Create the Genesis Data

>> Create more address

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

> List Address
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}'  -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```
```bash
>> Result
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": [
            "P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8", 
            "P-local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c", 
            "P-local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn",
            "P-local145z00lmjtlturfkzz2t4ynedekx7tmdh6nsv40",
            "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u", 
            "P-local1hqg53hfkzjszj47kg5fr3pu3ukdka7cqarmwa3", 
            "P-local1d2v324g4fjkzyughf6m4eaut6zarlm5rjw46hr", 
            "P-local14h080hyv4qj4w2mlwy4wfqpaa8e2fjfh3ahnsf",
            "P-local1a95s2k8d3pr4yz3j9s4m2xfkvrlgu3zjeu0sd0"
            ]
    },
    "id": 1
}
```
>> Build Genesis | avm.buildGenesis
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "genesisData": {
            "asset1": {
                "name": "fortevefa",
                "symbol":"FFA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000,
                            "address": "local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8"
                        },
                        {
                            "amount":100000,
                            "address": "local1cpdc2metfnvfnmwe7plwmw49jqyjkp7t92jt4c"
                        },
                        {
                            "amount":50000,
                            "address": "local1wvdt0j3tc5khfvqlpjug33ekdeu0v2vr689kyn"
                        },
                        {
                            "amount":50000,
                            "address": "local145z00lmjtlturfkzz2t4ynedekx7tmdh6nsv40"
                        }
                    ]
                }
            },
            "asset2": {
                "name": "forteveca",
                "symbol":"FCA",
                "initialState": {
                    "variableCap" : [
                        {
                            "minters": [
                                "local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
                                "local1hqg53hfkzjszj47kg5fr3pu3ukdka7cqarmwa3"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "local1d2v324g4fjkzyughf6m4eaut6zarlm5rjw46hr",
                                "local14h080hyv4qj4w2mlwy4wfqpaa8e2fjfh3ahnsf",
                                "local1a95s2k8d3pr4yz3j9s4m2xfkvrlgu3zjeu0sd0"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

```bash
>> Result
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111113CQ1MDf9CrobqtJnjsa6p5ZYWdQshdMFqVQd6PvGSy8PNJUnTX1oDT6pvXBUWAwnsaKSyAvDLGDRF8owBoT4u5zzPPGLYHr8iNcwtooY6eYf7UCnKq96duu5xw9wwuGwHs6W9m3Kboz3a1EmtPC2Hfn9WRkXp5obxh61HiqRDSXkz2KgQXe2HH1TyL2a4jnZBkr7ujHTuYDetXR1JEnSpbKU8K1KSroHqGMQZi47VetscswWaBTPfw3ohxbnpNkffz62ThcfM1GHUWn8mwo7tFNaaAZqAGYscaE17vU4it2oRX4zVZXbp98bGiaxdN56EgbMA5mSyu6gJpbn46AvQhUCyt9PpWgAAZWySu5qeQN4Hj8daqku2s366aKRYAJYaeJvzYpJZdSDA7v9H1wJJtTneFMbc85EV82KiVaoPuEtAuLqEH5hVae3KiVS9dAiqx9aJYu14eMkq3brUSWm8k3diwHToxPPL9Xd4vKADn8AcscjmqtKcsMfR5SDodjgT63UBH7mhVBZNiC4wt1e53BfvbLxn7Khvkk1U5r1w2PC3LHbJNoTdXtyoLestkdRArZAvoGzvs36PLbH3mkzviEpdQidUSCyB8s6r6DzzRkhivWiDnJtFdnBpBRTbVtAfXyaHjT43CkgGoTZaD7NDMsarbPJei9f8rqfWHrs99nuhWteeCJM",
        "encoding": "cb58"
    },
    "id": 1
}
```
> Create the Blockchain
```bash
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1",
        "vmID":"avm",
        "name":"My new AVM",
        "genesisData": "111113CQ1MDf9CrobqtJnjsa6p5ZYWdQshdMFqVQd6PvGSy8PNJUnTX1oDT6pvXBUWAwnsaKSyAvDLGDRF8owBoT4u5zzPPGLYHr8iNcwtooY6eYf7UCnKq96duu5xw9wwuGwHs6W9m3Kboz3a1EmtPC2Hfn9WRkXp5obxh61HiqRDSXkz2KgQXe2HH1TyL2a4jnZBkr7ujHTuYDetXR1JEnSpbKU8K1KSroHqGMQZi47VetscswWaBTPfw3ohxbnpNkffz62ThcfM1GHUWn8mwo7tFNaaAZqAGYscaE17vU4it2oRX4zVZXbp98bGiaxdN56EgbMA5mSyu6gJpbn46AvQhUCyt9PpWgAAZWySu5qeQN4Hj8daqku2s366aKRYAJYaeJvzYpJZdSDA7v9H1wJJtTneFMbc85EV82KiVaoPuEtAuLqEH5hVae3KiVS9dAiqx9aJYu14eMkq3brUSWm8k3diwHToxPPL9Xd4vKADn8AcscjmqtKcsMfR5SDodjgT63UBH7mhVBZNiC4wt1e53BfvbLxn7Khvkk1U5r1w2PC3LHbJNoTdXtyoLestkdRArZAvoGzvs36PLbH3mkzviEpdQidUSCyB8s6r6DzzRkhivWiDnJtFdnBpBRTbVtAfXyaHjT43CkgGoTZaD7NDMsarbPJei9f8rqfWHrs99nuhWteeCJM",
        "username": "Fort__EVE",
        "password": "forteveteam"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```
```bash
>> Result
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "QAJC7vBHV3y8CRYNvaRwgPnDPR6ncro7QAqKCTHEjKtDUGcri",
        "changeAddr": "P-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8"
    },
    "id": 1
}
```
> Verify Success
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```bash
>> Result
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [{
            "id": "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed",
            "name": "X-Chain",
            "subnetID": "11111111111111111111111111111111LpoYY",
            "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
        }, {
            "id": "26sSDdFXoKeShAqVfvugUiUQKhMZtHYDLeBqmBfNfcdjziTrZA",
            "name": "C-Chain",
            "subnetID": "11111111111111111111111111111111LpoYY",
            "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
        }, {
            "id": "QAJC7vBHV3y8CRYNvaRwgPnDPR6ncro7QAqKCTHEjKtDUGcri",
            "name": "My new AVM",
            "subnetID": "2brvmYvpzRnVpShgVRWY74pM2SrYcoe3Ko7px1AcR3Jmtc52p1",
            "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
        }]
    },
    "id": 1
}
```
> Interact With the New Blockchain
>> The API endpoint of our blockchain is 127.0.0.1:9650/ext/bc/QAJC7vBHV3y8CRYNvaRwgPnDPR6ncro7QAqKCTHEjKtDUGcri
```bash
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"QAJC7vBHV3y8CRYNvaRwgPnDPR6ncro7QAqKCTHEjKtDUGcri-local1c3qv53qc7uth9w0kp6js5frfcgj36cyzc0m4u8",
        "assetID":"asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/QAJC7vBHV3y8CRYNvaRwgPnDPR6ncro7QAqKCTHEjKtDUGcri
```

### DONE











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
curl --location --request POST 'localhost:9650/ext/platform' \
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