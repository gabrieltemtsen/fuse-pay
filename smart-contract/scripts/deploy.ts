import * as dotenv from "dotenv"
import * as hre  from "hardhat";
dotenv.config();



async function main() {
    console.log("Deploying FusePayManager Contract...");
  
  // here we deploy the contract    0x20089B148825512b814B9452A9b0389Ee6b9FBBe
 const FusePayManagerContract = await hre.ethers.deployContract("FusePayManager", );

  await FusePayManagerContract.waitForDeployment();

 // print the address of the deployed contract
  console.log("FusePay Manager Contract Address: ", FusePayManagerContract.target);

//   console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
//   await hre.run("verify:verify", {
//     address: FusePayManagerContract.target,
//     constructorArguments: [],
//   });

}
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});