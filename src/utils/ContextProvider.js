import { useState ,useEffect} from "react";
import { ModalContext } from "./ModelContext";
import {
  connectWallet,
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
  getBalance,
  network,
  forcenetwork,
  onChainChange,
  onMetamaskDisconnect
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
  const [nwk, setNetwork] = useState("");
  const [total,setTotal] = useState(0);

  
  
 


  const blockchainNetwork = {
    5:"Goerli",
    1:"Eth"
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
   
  const connectMetawallet = async () => {
    setConnectWalletModal(!connectWalletModal);
    const accounts = await connectWallet();
    console.log(accounts,"accounts");
     setAccount(accounts);
     await forcenetwork();
   const b =  await getBalance(accounts[0]);
    setBalance(b)
    const net = await network();
    setNetwork(blockchainNetwork[net]);
    
    if (!isWalletConnected()) {
      connectWalletLocaly();
    }
    
  }


  const connectWalletHandle = async () => {
    setModalvisibility(!walletModalvisibility);
    const accounts = await connectWallet();
     setAccount(accounts);
     await forcenetwork();
   const b =  await getBalance(accounts[0]);
    setBalance(b)
    const net = await network();
    console.log(net);
    setNetwork(blockchainNetwork[net]);
    
    if (!isWalletConnected()) {
      connectWalletLocaly();
    }
   
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
    onMetamaskDisconnect();
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
        connectMetawallet,
        remaining,
        setRemaining,
        loader,
        loading,
        setloading,
        balance,
        network,
        nwk,
        total
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
