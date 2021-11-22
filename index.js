const Web3 = require('web3');
require('dotenv').config();

let web3 = new Web3(process.env.RPC_URL || 'ws://localhost');
const wallet = {
    address: process.env.WALLET_ADDRESS,
    privateKey: process.env.WALLET_PRIVATEKEY,
}
const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);

(async function() {
    const result = await transfer('To Address', 0.01, wallet.privateKey);
    const res = await web3.eth.sendSignedTransaction(result.rawTransaction);
    console.log(result, res);
    const newBalance = await web3.eth.getBalance(wallet.address);
    console.log('new Balance', web3.utils.fromWei(newBalance, 'ether'))
})()


async function transfer(to, money, privateKey) {
    const chainId = await web3.eth.net.getId();
    const value = web3.utils.toWei(``+money, 'ether');
    return web3.eth.accounts.signTransaction({
        to,
        value,
        gas: 21000,
        chainId
    }, privateKey);
}