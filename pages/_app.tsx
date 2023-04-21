import "@/styles/globals.css";
// import React from "react";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet()]}
      activeChain={ChainId.Mumbai}
    >
      <Component {...pageProps} />;
      <Toaster />
    </ThirdwebProvider>
  );
}
