import { ethers } from "hardhat";

async function main() {

  

  // Deploying the contract 
  const Staking = await ethers.getContractFactory("stake_with_APY");
  const staking = await Staking.deploy();

  await staking.deployed();

  console.log(`Your contact address: ${staking.address}`);
  // Your contact address: 0x34398D365dbcC33BD09Df0c6f05920cb774Df004



  // Interacting with deployed smart contract 
  const amount_of_days = 14;
  const amount = ethers.utils.parseEther("0.5");

  const deposit = await staking.depositEther( amount_of_days, {value: amount});
  console.log("deposited ether", deposit);

  // trnsaction hash1: 0xa332f8b050b3f8fba6aaf0cce43f4b6b7e973c620df7be58be8cf1f76d9507f8 
  // trnsaction hash1: 0x9656021bb4aec777a4c44e9dcecdf65d02490318ccaed06de851e20ebd805a25
 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
