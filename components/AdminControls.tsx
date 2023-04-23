import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "@/constants";
function AdminControls() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: totalCommission } = useContractRead(
    contract,
    "operatorTotalCommission"
  );

  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );

  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );

  const { mutateAsync: restartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );

  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");

  // winner
  const drawWinner = async () => {
    const notification = toast.loading("Processing", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    try {
      const data = await DrawWinnerTicket({});
      toast.success("Execution succesful", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Execution Failed", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  // commission withdrawal
  const onWithdrawCommission = async () => {
    const notification = toast.loading("Processing", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    try {
      const data = await WithdrawCommission({});
      toast.success("Execution succesful", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Execution Failed", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  // Restart draw
  const onRestartDraw = async () => {
    const notification = toast.loading("Processing", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    try {
      const data = await restartDraw({});
      toast.success("Execution succesful", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Execution Failed", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  // RefundAll

  const onRefund = async () => {
    const notification = toast.loading("Processing", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    try {
      const data = await RefundAll({});
      toast.success("Execution succesful", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Execution Failed", {
        id: notification,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-slate-300 border hover:border-slate-700 transition duration-200">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commission to be withdrawn:{" "}
        {totalCommission &&
          ethers.utils.formatEther(totalCommission?.toString())}{" "}
        {currency}
      </p>

      <div className=" flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button className="admin-button" onClick={drawWinner}>
          <StarIcon className="h-6 mx-auto mb-2" />
          Draw Winner
        </button>
        <button className="admin-button" onClick={onWithdrawCommission}>
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commission
        </button>
        <button className="admin-button" onClick={onRestartDraw}>
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </button>
        <button className="admin-button" onClick={onRefund}>
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminControls;
