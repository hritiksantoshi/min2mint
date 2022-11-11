import { useState } from "react";
import { ModalContext } from "./ModelContext";
import {
  connectWallet,
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
  getBalance,
  network
} from "../config";

const ContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [metamaskModalVisibility, setMetamaskModalVisibility] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [loading,setloading] = useState(false);
  const [account, setAccount] = useState("");
  const [remaining, setRemaining] = useState();
  const [balance,setBalance] = useState("");
  const [nwk, setNetwork] = useState("")


  const blockchainNetwork = {
    5:"GoerliETH",
    1:"Etherum Mainnet"
  }
 
  const loader = () => {
    setloading(!loading);
  }
  
  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  const metamaskModalHandle = () => {
    setMetamaskModalVisibility(!metamaskModalVisibility);
  };

  const connectWalletModalHanlde = () => {
    if (!isWalletConnected()) {
      setConnectWalletModal(!connectWalletModal);
    }
  };

  const connectWalletHandle = async () => {
    const accounts = await connectWallet();
    console.log(accounts,"accounts");
     setAccount(accounts);
   const b =  await getBalance(accounts[0]);
    setBalance(b)
    const net = await network();
    setNetwork(blockchainNetwork[net]);
    
    if (!isWalletConnected()) {
      connectWalletLocaly();
    }
    setModalvisibility(!walletModalvisibility);
  };

  const isWalletAlreadyConnected = async () => {
    if (isWalletConnected()) {
      const accounts = await connectWallet();
      setAccount(accounts);
      const b =  await getBalance(accounts[0]);
      setBalance(b);
      const net = await network();
      setNetwork(blockchainNetwork[net]);
    }
  };

  const disconnectWalletFromApp = () => {
    disconnectWallet();
    setAccount("");
  };

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        shareModalHandle,
        metamaskModalVisibility,
        metamaskModalHandle,
        account,
        connectWalletHandle,
        isWalletAlreadyConnected,
        disconnectWalletFromApp,
        connectWalletModalHanlde,
        connectWalletModal,
        remaining,
        setRemaining,
        loader,
        loading,
        setloading,
        balance,
        network,
        nwk
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
