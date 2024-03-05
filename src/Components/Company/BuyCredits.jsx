import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { ImLeaf } from "react-icons/im";
import { Button, Input } from "@material-tailwind/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import axios from "axios";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const BuyCredits = () => {
  const [companyName, setCompanyName] = useState("");
  const [tokens, setTokens] = useState("");

  const handleBuyCredits = async () => {
    try {
      // Send a request to your backend API to update tokens
      const response = await axios.post("http://localhost:3001/comp/update", {
        name: companyName,
        tokens: parseInt(tokens), // Ensure tokens are parsed as integer
      });

      console.log(response.data); // Log response from backend
      // You can also perform further actions after successful update
    } catch (error) {
      console.error("Error buying credits:", error);
      // Handle error
    }
  };
  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div className="p-4 sm:ml-64 w-full mt-10">
        <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
          <div className=" items-center w-full justify-center mb-10  bg-blue-50 dark:bg-gray-800 p-5 rounded-md">
            <h1 className="text-2xl font-bold text-blue-500">
              Need more Carbon Credits?
            </h1>
            <p className="text-red-500">
              Please first check out the Current carbon emmission threshhold
              value or limit or GHG emmission score in your area. If it found
              that you're area is already matched threshhold value, then
              purchasing more <span className="text-green-500">Credits</span>{" "}
              will lead to Air pollution.
            </p>
          </div>

          <div className="flex justify-between border-t-4 py-5 items-center ">
            <div>
              <h1 className="text-2xl font-semibold">
                Purchase Credits from Government
              </h1>
              <p>
                transaction will be secured between your organization and
                Government.
              </p>
            </div>
            <div className="flex items-center justify-center gap-5 bg-green-100 hover:scale-105 ease-in duration-200 cursor-pointer rounded-md p-4">
              <div>
                <ImLeaf className="text-2xl text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Purchase from Certified Green Company?
                </h2>
                <p>
                  Helps to maintain and build strong infrastructure of CO2 and
                  GHG emmission of the country.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-5">
            <Sidebar />
            <div className="p-4 sm:ml-64 w-full mt-10">
              <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
                <div className=" items-center w-full justify-center mb-10  bg-blue-50 dark:bg-gray-800 p-5 rounded-md">
                  <h1 className="text-2xl font-bold text-blue-500">
                    Need more Carbon Credits?
                  </h1>
                  <p className="text-red-500">
                    Please first check out the Current carbon emission threshold
                    value or limit or GHG emission score in your area. If it
                    found that your area is already matched threshold value,
                    then purchasing more{" "}
                    <span className="text-green-500">Credits</span> will lead to
                    Air pollution.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 ">
                  <div className="col-span-1 p-5 h-auto z-10 items-center justify-center gap-5">
                    <div className="bg-white border-2 border-gray-400 p-5 rounded-xl ">
                      <div className="py-2" id="desc">
                        <h1 className="text-2xl font-bold text-blue-600">
                          Buy Credits from Government
                        </h1>
                        <span className="text-gray-700 font-sans">
                          Transactions are made in ether, please connect to your
                          wallet before transaction
                        </span>
                      </div>
                      <div className="my-4 flex flex-col gap-6">
                        <Input
                          crossOrigin="anonymous"
                          size="lg"
                          label="Company Name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input
                          crossOrigin="anonymous"
                          size="lg"
                          label="Tokens"
                          value={tokens}
                          onChange={(e) => setTokens(e.target.value)}
                          className="bg-white selection:bg-none selection:border-none border-0"
                        />
                      </div>
                      <Button
                        variant="gradient"
                        color="blue"
                        className="flex justify-center my-5 items-center gap-3 text-md"
                        fullWidth
                        onClick={handleBuyCredits} // Call handleBuyCredits on button click
                      >
                        <MdOutlineAccountBalanceWallet className="text-xl" />
                        Buy Credits
                      </Button>
                    </div>
                    <div className="h-12"></div>
                    <div className="bg-white border-2 border-gray-400 p-5 rounded-xl ">
                      <div className="py-2" id="desc">
                        <h1 className="text-4xl font-bold text-red-600">
                          SELL CREADITS
                        </h1>
                        <span className="text-gray-700 font-sans">
                          Transactions are made in ether, please connect to your
                          wallet before transaction
                        </span>
                      </div>
                      <div className="my-4 flex flex-col gap-6">
                        <Input
                          crossOrigin="anonymous"
                          size="lg"
                          label="Company name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input
                          crossOrigin="anonymous"
                          size="lg"
                          label="Tokens"
                          value={tokens}
                          onChange={(e) => setTokens(e.target.value)}
                          className="bg-white selection:bg-none selection:border-none border-0"
                        />
                      </div>
                      <Button
                        variant="gradient"
                        color="blue"
                        className="flex justify-center my-5 items-center gap-3 text-md"
                        fullWidth
                        onClick={handleBuyCredits} // Call handleBuyCredits on button click
                      >
                        <MdOutlineAccountBalanceWallet className="text-xl" />
                        SEll Credits
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;
