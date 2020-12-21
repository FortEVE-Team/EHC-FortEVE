const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');
const { encodeMultiAddress } = require('@polkadot/util-crypto');
const inquirer = require("inquirer");
const polkajspUnit = BigInt(1000000000000);

const baseWs = new WsProvider('ws://localhost:9944');

async function dataSinSen(account, tx) {
    return new Promise((resolve, reject) => {
        tx.signAndSend(account, (result) => {
            console.log("Transaction Status" + result.status.type);

            if (result.status.isFinalized) {
                resolve(result);
            }
            else if (
                result.status.isDropped ||
                result.status.isInvalid ||
                result.status.isUsurped
            ) {
                console.error("Transaction Could Not Be Finalized");
                reject(result);
            }
        });
    });
}

async function dataBalance(api, address) {
    return (await api.query.system.account(address)).data;
}

async function dataMultisig(api, address, txHash) {
    return await api.query.multisig.multisigs(address, txHash);
}

async function main() {
    const api = await ApiPromise.create({
        provider: baseWs,
        types: {
            Address: 'AccountId',
            LookupSource: 'AccountId'
        },
    });

    //  Get accounts

    const keyring = new Keyring({ type: "sr25519" });
    const accounts = {
        Alice: keyring.addFromUri("//Alice"),
        Bob: keyring.addFromUri("//Bob"),
        Charlie: keyring.addFromUri("//Charlie"),
        Dave: keyring.addFromUri("//Dave"),
        Eve: keyring.addFromUri("//Eve"),
        Ferdie: keyring.addFromUri("//Ferdie"),
    };

    console.log();

    //  Inquire details

    const transBase = (
        await inquirer.prompt([
            {
                name: "transBase",
                type: "list",
                message: "Transfer From: ",
                choices: Object.keys(accounts)
                    .map((key => {
                        return `${key}`;
                    })),
            },
        ])
    ).transBase
    const transBaseAddress = accounts[transBase].address;

    const signatories = (
        await inquirer.prompt([
            {
                name: "signatories",
                type: "checkbox",
                message: "Signatories: ",
                choices: Object.keys(accounts)
                    .filter((key) => transBase !== key)
                    .map((key) => {
                        return `${key}`;
                    }),
            },
        ])
    ).signatories;
    const signatoryAddresses = signatories.map((signatory) => accounts[signatory].address);

    const transBaseTo = (
        await inquirer.prompt([
            {
                name: "transBaseTo",
                type: "list",
                message: "Transfer To: ",
                choices: Object.keys(accounts)
                    .filter((key) => transBase !== key && !signatories.includes(key))
                    .map((key => {
                        return `${key}`;
                    })),
            },
        ])
    ).transBaseTo;
    const transBaseToAddress = accounts[transBaseTo].address;
    const threshold = (
        await inquirer.prompt([
            {
                name: "threshold",
                type: "number",
                message: "Threshold: ",
            },
        ])
    ).threshold;

    const amount = (
        await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Amount: ",
            },
        ])
    ).amount;

    console.log("Transfer To " + transBaseTo)+ " \nAddress Balance Before transaction: " + (await dataBalance(api, transBaseToAddress).free);

    const multisigAddress = encodeMultiAddress(signatoryAddresses.concat(transBaseAddress), threshold, 42);

    console.log("Multisig Address: " + multisigAddress);

    console.log("\nMultisig address before transfer: " + (await dataBalance(api, multisigAddress)).free);

    const txInit = api.tx.balances.transfer(multisigAddress, BigInt(amount) * polkajspUnit);
    await dataSinSen(accounts[transBase], txInit);

    console.log("Multisig address after trasnfer: " + (await dataBalance(api, multisigAddress)).free);

    console.log("\n -- FetchingData --");

    const tx = api.tx.balances.transfer(transBaseToAddress, BigInt(amount) * polkajspUnit);
    const txHash = tx.method.hash;
    const txData = tx.method.toHex();

    console.log(" Tx Hash: " + txHash);
    console.log(" Tx Data: " + txData);
    //  Initialise the multisig address by sending the funds



    //  Transferor - Approve the transaction

    console.log("\nTransaction has been approves " + transBase);

    const txtransBaseTo = api.tx.multisig.approveAsMulti(threshold, signatoryAddresses, null, txHash, polkajspUnit);
    await dataSinSen(accounts[transBase], txtransBaseTo);

    const multisig = await dataMultisig(api, multisigAddress, txHash);
    const timepoint = multisig.unwrap().when;

    //  Signatories - Approve the transaction

    for(let i = 0; i < signatories.length; i++) {
        console.log("\nTransaction has been approves " + signatories[i]);
        
        const filteredSignatoryAddresses = signatoryAddresses.slice(0, i)
            .concat(signatoryAddresses.slice(i+1, signatoryAddresses.length))
            .concat(transBaseAddress);
        const txSignatory = api.tx.multisig.asMulti(threshold, filteredSignatoryAddresses, timepoint, txData, false, polkajspUnit);
        await dataSinSen(accounts[signatories[i]], txSignatory);
    }

    console.log(transBaseTo + " Address balances after transaction:" + (await dataBalance(api, transBaseToAddress)).free);
}

main()
    .catch(console.error)
    .finally(() => process.exit());