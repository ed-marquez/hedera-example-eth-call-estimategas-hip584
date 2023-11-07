console.clear();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import abi from "./contracts/abi.js";
import bytecode from "./contracts/bytecode.js";

import { ethers, ContractFactory } from "ethers";

const network = "testnet";
const provider = new ethers.providers.JsonRpcProvider(`https://${network}.hashio.io/api`);
const signer = new ethers.Wallet(process.env.OPERATOR_PVKEY_HEX, provider);

const explorerURL = `https://hashscan.io/${network}`;

async function main() {
	// STEP 1 ===================================
	console.log(`\nSTEP 1 ===================================\n`);
	console.log(`- Deploy the smart contract...\n`);

	let gasLimit = 4000000;

	// Parameters to pass to the constructor of the contract
	const itemName = "Spaceships";
	const itemAmount = 150;

	const newContract = new ContractFactory(abi, bytecode, signer);
	const contractDeployTx = await newContract.deploy(itemName, itemAmount, { gasLimit: gasLimit });
	const contractDeployRx = await contractDeployTx.deployTransaction.wait();
	const contractAddress = contractDeployRx.contractAddress;
	console.log(`- Contract deployed to address: ${contractAddress} ✅`);
	console.log(`- See details in HashScan: \n ${explorerURL}/address/${contractAddress} \n `);

	// STEP 2 ===================================
	console.log(`\nSTEP 2 ===================================\n`);
	console.log(`- Call contract function (read only query) with eth_call...\n`);
	console.log(`- FAILS IF GAS IS ZERO - DOUBLE CHECK THIS LATER...\n`);

	gasLimit = 100000;
	const myContract = new ethers.Contract(contractAddress, abi, signer);
	const callTx = await myContract.getAmount(itemName, { gasLimit: gasLimit });
	const callResult = callTx.toString();

	console.log(`- Contract call complete ✅ | ${callResult} unit(s) of ${itemName} are available \n`);

	// STEP 3 ===================================
	console.log(`\nSTEP 3 ===================================\n`);
	console.log(`- Estimate gas with eth_estimateGas...\n`);

	const newItemName = "Rockets";
	const newItemAmount = 150000;
	const txToEstimate = await myContract.populateTransaction.setNameNAmount(newItemName, newItemAmount);
	let gasEstimate = await provider.estimateGas(txToEstimate);
	console.log(`- Estimated gas for storing data tx: ${gasEstimate}`);

	// const transaction1 = {
	// 	to: contractAddress, // The address to send to
	// 	value: ethers.utils.parseEther("1.0"), // Amount to send
	// };
	// const gasEstimate1 = await provider.estimateGas(transaction1);
	// console.log(`- Estimated gas for transfer tx: ${gasEstimate1}`);

	// STEP 4 ===================================
	console.log(`\nSTEP 4 ===================================\n`);
	console.log(`- Execute transaction (store data) with estimated gas value...\n`);

	gasLimit = gasEstimate;
	const executeTx = await myContract.setNameNAmount(newItemName, newItemAmount, { gasLimit: gasLimit });
	const executeRx = await executeTx.wait();
	const txHash = executeRx.transactionHash;

	console.log(`- Contract executed ✅`);
	console.log(`- See details in HashScan: \n ${explorerURL}/tx/${txHash}`);

	console.log(`
====================================================
🎉🎉 THE END - NOW JOIN: https://hedera.com/discord
====================================================\n`);
}
main();
