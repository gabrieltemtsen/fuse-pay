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
  etherscan: {
    apiKey: {
        alfajores: "7M5Y1J1CE5FT66EKD1M4DBSJKVZ6WH7Y43",
        celo: "7M5Y1J1CE5FT66EKD1M4DBSJKVZ6WH7Y43"
    },
    customChains: [
        {
            network: "alfajores",
            chainId: 44787,
            urls: {
                apiURL: "https://api-alfajores.celoscan.io/api",
                browserURL: "https://alfajores.celoscan.io",
            },
        },
        {
            network: "celo",
            chainId: 42220,
            urls: {
                apiURL: "https://api.celoscan.io/api",
                browserURL: "https://celoscan.io/",
            },
        },
    ]
},
};

export default config;
