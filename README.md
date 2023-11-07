# Hedera Example: eth_call and eth_estimateGas (HIP-584)

This repository contains a JavaScript example for testing the Hedera Improvement Proposal (HIP) 584. HIP-584 is a significant enhancement to the Hedera network that enables using `eth_call` and `eth_estimateGas`for more accurate gas estimations of contract operations on Hedera.

## What is HIP-584?

HIP-584 is a Hedera Improvement Proposal that introduces EVM execution APIs on mirror nodes, along with transaction simulations, to the Hedera network. This proposal includes the initial APIs for handling contract execution-related queries, effectively allowing a mirror node to act as an EVM Archive Node. The motivation behind HIP-584 is to enhance user experience by enabling cost-free execution of read-only smart contract queries, gas estimation, and the transient simulation of read-write operations without committing changes to state. It facilitates the following:
- Execution of simulations for read-only operations.
- Transaction simulations that perform speculative writes using historical data for transaction replay without changing the state.

HIP-584 enables users to perform `eth_call` and `eth_estimateGas` calls in accordance with the Ethereum JSON-RPC standard and allows the use of a library to rerun historical EVM transactions for inspection and debugging purposes.
See [more details about HIP-584](https://hips.hedera.com/hip/hip-584). 

## index.js

The `index.js` file in this repository shows how to interact with the Hedera network using `ethers.js` to perform `eth_call` and `eth_estimateGas` operations. It implements these steps:

- Deploy an Ethereum-compatible smart contract on Hedera.
- Perform a read-only call to the smart contract using `eth_call`.
- Estimate the gas required for a state-changing operation using `eth_estimateGas`.
- Execute a contract function that changes the state of the contract based on that estimated gas.

## Try This Example Quickly on GitPod

[Click here to open on GitPod](https://gitpod.io/#https://github.com/ed-marquez/hedera-example-eth-call-estimategas-hip584)
