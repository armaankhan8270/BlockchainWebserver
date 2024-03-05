import React, { useState } from "react";
import { ImLeaf } from "react-icons/im";
import { Button, Input } from "@material-tailwind/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import axios from "axios";
import Sidebar from "./Sidebar";
const SellCredits = () => {
  const [companyName, setCompanyName] = useState("");
  const [tokens, setTokens] = useState("");

  const handleSellCredits = async () => {
    try {
      // Send a request to your backend API to sell credits
      const response = await axios.post("http://localhost:3001/comp/sell", {
        companyName,
        tokens: parseInt(tokens),
      });

      console.log(response.data); // Log response from backend
      // You can also perform further actions after successful selling
    } catch (error) {
      console.error("Error selling credits:", error);
      // Handle error
    }
  };

  return (
    <div className="bg-white border-2 lg:mx-[22%] lg:my-[10%] border-gray-400 p-5 rounded-xl ">
      <Sidebar />

      <div className="py-2" id="desc">
        <h1 className="text-4xl font-bold text-teal-700">Sell Credits</h1>
        <span className="text-gray-700 font-sans">
          Transactions are made in ether, please connect to your wallet before
          transaction
        </span>
      </div>
      <div className="my-4 flex flex-col gap-6">
        <Input
          size="lg"
          label="Company Name"
          value={companyName}
          crossOrigin="anonymous"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          size="lg"
          label="Tokens"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          crossOrigin="anonymous"
          className="bg-white selection:bg-none selection:border-none border-0"
        />
      </div>
      <Button
        variant="gradient"
        color="teal"
        className="flex justify-center my-5 items-center gap-3 text-md"
        fullWidth
        onClick={handleSellCredits} // Call handleSellCredits on button click
      >
        <MdOutlineAccountBalanceWallet className="text-xl" />
        Sell Credits
      </Button>
    </div>
  );
};

export default SellCredits;
