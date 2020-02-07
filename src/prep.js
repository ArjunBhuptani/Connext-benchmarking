const connext = require("../dist");
const { connect } = connext;

const constants = require("ethers/constants");
const { AddressZero } = constants;

const ethers = require("ethers");
const { Wallet, getDefaultProvider } = ethers;

const utils = require("ethers/utils")
const { parseEther } = utils;

const store = require("@connext/store")
const { ConnextStore, FileStorage} = store

const prep = async () => {
    const clientA = await connect({
        mnemonic: "harsh cancel view follow approve digital tool cram physical easily lend cinnamon betray scene round",
        nodeUrl: "nats://localhost:4222",
        ethProviderUrl: "http://localhost:8545",
        store: new ConnextStore(new FileStorage())
    })
    const clientB = await connect({
        mnemonic: "mom shrimp way ripple gravity scene eyebrow topic enlist apple analyst shell obscure midnight buddy", 
        nodeUrl: "nats://localhost:4222",
        ethProviderUrl: "http://localhost:8545",
        store: new ConnextStore(new FileStorage())
    })
    const provider = new ethers.providers.JsonRpcProvider();
    const wallet = new Wallet.fromMnemonic('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat').connect(provider)

    console.log("requesting deposit rights")
    await clientA.requestDepositRights({assetId: AddressZero})

    console.log("sending tx")
    const tx = await wallet.sendTransaction({
        to: clientA.multisigAddress,
        chainId: 4447,
        value: parseEther("0.02")
    })
    await tx.wait();
    await clientA.rescindDepositRights({assetId: AddressZero})

    console.log("requesting collateral")
    await clientB.requestCollateral(AddressZero);
    console.log("ready to flamegraphhh")
}

prep();