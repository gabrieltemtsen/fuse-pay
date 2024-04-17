import { App } from 'konsta/react';
import '@/styles/globals.css';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { http, WagmiProvider, createConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended",
            wallets: [injectedWallet],
        },
    ],
    {
        appName: "Fuse Pay",
        projectId: "063d0bf7cbe66b2e8291f29dc850fb19",
    }
);

const config = createConfig({
    connectors,
    chains: [celo, celoAlfajores],
    transports: {
        [celo.id]: http(),
        [celoAlfajores.id]: http(),
    },
});
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <App dark={true} safeAreas={true} theme={"parent" ?  "material" : "ios"}>
      <Component {...pageProps} />
    </App>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    
  );
}

export default MyApp;