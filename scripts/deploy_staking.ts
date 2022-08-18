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

  const deposit = await staking.depositEther({value: amount}, amount_of_days);
  console.log("deposited ether", deposit);
 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
