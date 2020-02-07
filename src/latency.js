const connext = require("../dist");
const { connect } = connext;

const store = require("@connext/store")
const { ConnextStore, FileStorage} = store

const constants = require("ethers/constants")
const { AddressZero } = constants;

const utils = require("ethers/utils")
const { parseEther } = utils

const latency = async (iteration) => {
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
    const start = Date.now()
    await clientA.transfer({
        assetId: AddressZero,
        recipient: clientB.publicIdentifier,
        amount: parseEther("0.0001"),
        meta: {iteration}
    })
    return new Promise((res) => {
        clientB.on("RECEIVE_TRANSFER_FINISHED_EVENT", (data) => {
            if(data.meta.iteration !== iteration) {
                const duration = Date.now() - start
                console.log("==================================== Transfer complete. Iteration # " + data.meta.iteration + " =====================================")
                console.log(duration/1000)
                return res(duration/1000)
            } else { console.log("EEEROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR")}
        })
    })
}

module.exports.test = async function (iterations) {
    let times = [];
    let sum = 0;
    for(let i = 0; i<iterations; i++) {
        times[i] = await latency(i);
        sum = sum + times[i]
    }
    console.log("==================================== DONE =====================================")
    console.log("==================================== Mean = " + sum/iterations + " =====================================")
    console.log("==================================== DONE =====================================")
}