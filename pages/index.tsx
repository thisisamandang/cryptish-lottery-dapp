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
import CountdownTimer from "@/components/CountdownTimer";
import { useState } from "react";
import { ethers } from "ethers";
import { currency } from "@/constants";
import { toast } from "react-hot-toast";

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");

  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { data: expiration } = useContractRead(contract, "expiration");

  const { mutateAsync: buyTickets } = useContractWrite(contract, "BuyTickets");

  const clickHandler = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying Tickets...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    // try {
    //   const data = await BuyTickets({
    //     value: [
    //       ethers.utils.parseEther(
    //         (
    //           Number(ethers.utils.formatEther(ticketPrice)) * quantity
    //         ).toString()
    //       ),
    //     ],
    //   });
    //   console.info("contract call successs", data);
    // } catch (err) {
    //   console.error("contract call failure", err);
    // }
    try {
      const numOfTicketsToBuy = quantity; // replace with the number of tickets to buy
      const value = ethers.utils.parseEther(
        (
          Number(ethers.utils.formatEther(ticketPrice)) * numOfTicketsToBuy
        ).toString()
      );
      const data = await buyTickets({
        overrides: { value },
      });
      toast.success("Tickets purchased successfully", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("whoops Something went wrong", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  const address = useAddress();
  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-[#0c1216] min-h-screen flex flex-col">
      <Head>
        <title>Lottery Dapp</title>
      </Head>
      <div className=" flex-1">
        <Header />

        {/* Draw Box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              Next Draw
            </h1>

            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm ">Accumulated Pool</h2>
                <p className="text-xl">
                  {currentWinningReward &&
                    ethers.utils.formatEther(
                      currentWinningReward.toString()
                    )}{" "}
                  {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>
          <div className="stats-container space-y-2">
            <div className="stats-container border-slate-400 hover:!border-slate-300">
              <div className="flex justify-between items-center text-white pb-2">
                <h2 className="mr-4">Price per Ticket:</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice?.toString())}{" "}
                  {currency}
                </p>
              </div>
              <div className="flex bg-[#191c20a2] text-white items-center space-x-2 p-4 border border-slate-300">
                <p>TICKETS</p>
                <input
                  className="flex w-full text-right outline-none bg-transparent"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-[#98ebc4] text-s italic font-bold">
                  <p>Total Cost of Tickets</p>
                  <p>
                    {ticketPrice &&
                      Number(
                        ethers.utils.formatEther(ticketPrice?.toString())
                      ) * quantity}{" "}
                    {currency}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[#98ebc4] text-xs italic">
                  <p>Service fee</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(
                        ticketCommission?.toString()
                      )}{" "}
                    {currency}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[#98ebc4] text-xs italic">
                  <p>+ Network Fee</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                onClick={clickHandler}
                className="mt-5 w-full bg-[white] rounded-md px-10 py-5 shadow-xl disabled:bg-gray-400 disabled:text-gray-100 disabled:cursor-not-allowed"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
