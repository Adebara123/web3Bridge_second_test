import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
 

// Contract of tokens we are swapping
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    
// ethereum address of the persn we are trying to impersonate
const address = "0xa7a93fd0a276fc1c0197a5b5623ed117786eed06";
await helpers.impersonateAccount(address);
const impersonatedSigner = await ethers.getSigner(address);

// getting into the account we are impersonating and caling functions on them
const USDT = await ethers.getContractAt("IERC", USDT_ADDRESS, impersonatedSigner);
const WETH = await ethers.getContractAt("IERC", WETH_ADDRESS, impersonatedSigner);
const bal_usdt = await USDT.balanceOf(address);
const bal_WETH = await WETH.balanceOf(address);

//logging the balance of the account
console.log("Your usdt balance is", bal_usdt);
console.log("Your dai balance is", bal_WETH);

// contract of uniswap helping us to swap
const amountOut = 5e6;
const amountIn = 5000e6;
const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
const UNISWAP = await ethers.getContractAt("IUniswap", ROUTER_ADDRESS, impersonatedSigner);

// Approve the swap before swapping by calling the approve function
await USDT.approve(ROUTER_ADDRESS, amountOut);


//I used a function that swaps a token to ether, i used Weth to achieive this because, ether does not have a contract address, but Weth can 


//call the swap function
 const swapToken = await UNISWAP.swapExactTokensForETH(amountOut, amountIn, [USDT_ADDRESS, WETH_ADDRESS], address, deadline, {gasLimit: ethers.utils.hexlify(1000000)});
 console.log(swapToken);

//console.log("the swap", swapToken);

// checking our balance after we swapped 
const emit = await (await swapToken.wait());
console.log("Your usdt balance after swap is", bal_usdt);
console.log("Your dai balance after swap is", bal_WETH);

// This function adds liquidity
// const amountA_desired = 20e6;
// const amountB_desired = 3000e6;
// const amountAMin = 10e6;
// const amountBMin = 2000e6;

    

// const adLiquidity = await UNISWAP.addLiquidity(USDT_ADDRESS, WETH_ADDRESS, amountA_desired, amountB_desired, amountAMin, amountBMin, address, deadline);
// console.log("liquidity", adLiquidity);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
