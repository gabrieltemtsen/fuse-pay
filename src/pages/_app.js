import { App } from "konsta/react";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    celo,
    celoAlfajores,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [celoAlfajores]
      : []),
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "Fuse Pay",
  projectId: "063d0bf7cbe66b2e8291f29dc850fb19",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


function MyApp({ Component, pageProps }) {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isAndroid = userAgent.match(/Android/i);
    const isIOS = userAgent.match(/iPhone|iPad|iPod/i);
    const isLaptop = !isAndroid && !isIOS;

    if (isAndroid) {
      setDeviceType('android');
    } else if (isIOS) {
      setDeviceType('ios');
    } else {
      setDeviceType('laptop');
    }
  }, []);
  const theme = deviceType === 'ios' ? 'ios' : 'material';

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App dark={true} safeAreas={true} theme={theme}>

          <Component {...pageProps} />

        </App>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
