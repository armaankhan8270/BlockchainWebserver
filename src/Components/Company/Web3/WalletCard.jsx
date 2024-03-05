import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Sidebar from "../Sidebar";
import { ImNotification } from "react-icons/im";
export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

function WalletCard() {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div className="p-4 sm:ml-64 w-full mt-20">
        <div className="App">
          <div className="container p-5 w-full bg-blue-50 rounded-lg shadow-md">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              <div>
                <ImNotification /> Injected Provider{" "}
                {hasProvider ? "METAMASK DOES" : "METAMASK DOES NOT"} Exist
              </div>
            </div>

            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
              <button
                onClick={handleConnect}
                className="flex item-center gap-2 mb-2 text-xl font-bold text-gray-900 dark:text-whit px-3 py-2 border-2 shadow-xl border-orange-300 rounded-xl"
              >
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/metamask-icon.png"
                  className="w-7 h-7"
                />

                <span> Connect MetaMask</span>
              </button>
            )}
          </div>
          {wallet.accounts.length > 0 && (
            <>
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <div class="flex items-center mb-4">
                    <svg
                      class="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v9m0 0V9m0 0H3m9 0h9m-9 0L9 3m0 0L3 9m9 0l3 3m-3-3l3-3"
                      />
                    </svg>
                    <div class="text-lg font-semibold text-gray-900">
                      Wallet Information
                    </div>
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                      Wallet Details
                    </h1>
                  </div>
                  <div class="flex items-center mb-4">
                    <svg
                      class="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                    <div>
                      Wallet Accounts:{" "}
                      <span class="mb-2 text-xl mb-2 text-xl font-bold text-gray-900 dark:text-whit text-gray-900 dark:text-white">
                        {wallet.accounts[0]}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center mb-4">
                    <svg
                      class="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm0 0L3 21l7-7 4 4 7-7-2-2z"
                      />
                    </svg>
                    <div>
                      Wallet Balance:{" "}
                      <span class="mb-2 text-xl font-bold text-gray-900 dark:text-whit">
                        {wallet.balance}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center mb-4">
                    <svg
                      class="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 15h16M4 7h16M4 11h16"
                      />
                    </svg>
                    <div>
                      Hex ChainId:{" "}
                      <span class="mb-2 text-xl font-bold text-gray-900 dark:text-whit">
                        {wallet.chainId}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <svg
                      class="w-6 h-6 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                    <div>
                      Numeric ChainId:{" "}
                      <span class="mb-2 text-xl font-bold text-gray-900 dark:text-whit">
                        {formatChainAsNum(wallet.chainId)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
