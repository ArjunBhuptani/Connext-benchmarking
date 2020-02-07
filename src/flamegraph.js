const connext = require("../dist");
const { connect } = connext;

const store = require("@connext/store")
const { ConnextStore, FileStorage} = store

const constants = require("ethers/constants")
const { AddressZero } = constants;

const utils = require("ethers/utils")
const { parseEther } = utils

const flamegraph = async () => {
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
    clientB.on("RECEIVE_TRANSFER_FINISHED_EVENT", () => {
        console.log("==================================== DONE =====================================")
    })
    await clientA.transfer({
        assetId: AddressZero,
        recipient: clientB.publicIdentifier,
        amount: parseEther("0.0001")
    })
    new Promise((res) => setTimeout(res, 15000));
}

flamegraph();