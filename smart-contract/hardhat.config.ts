import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts:
        process.env.PRIVATE_HASH !== undefined
          ? [process.env.PRIVATE_HASH]
          : [],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts:
        process.env.PRIVATE_HASH !== undefined
          ? [process.env.PRIVATE_HASH]
          : [],
      chainId: 42220,
    },
  },
};

export default config;
