import Header from "@/components/Header";
import Head from "next/head";
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  useContractWrite,
  ConnectWallet,
} from "@thirdweb-dev/react";

import Login from "@/components/Login";
import Loading from "@/components/Loading";

export default function Home() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const address = useAddress();

  if (!address) return <Login />;

  return (
    <>
      <Head>
        <title>Lottery Dapp</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-[#0c1216] min-h-screen flex flex-col">
          <Header />
        </div>
      )}
    </>
  );
}
