import { useState ,useEffect} from "react";
import { ModalContext } from "./ModelContext";
import {
  connectWallet,
  connectWalletLocaly,
  isWalletConnected,
  disconnectWallet,
  getBalance,
  network
} from "../config";
import axios from "axios";
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

  const config = {
    method: 'get',
    url: 'https://api.pinata.cloud/data/userPinnedDataTotal',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzE5YjA3ZC01YjdiLTQ3YTYtOWNmYy1iM2QwMjVlMmM3YzEiLCJlbWFpbCI6ImhyeHRvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTdlMzFjMGQ5MWRkMjhlM2U5NzMiLCJzY29wZWRLZXlTZWNyZXQiOiIzM2RmYTkxNGM5OWZlMjFlYzcyMWIzOWE0NmJiZDRmZGE3NWI3Mjc2OWM5NzdlZDMwNDA3Zjc3MzZkM2MzYmIxIiwiaWF0IjoxNjY4MzE0OTc0fQ.6sln8Kd7hwOOtJf_xu4PFeIxtUoytdpJhpTds5xpVJQ'
    }
  };
  
  const data = async () => {
    const res = await axios(config);
    let Total = (res.data.pin_count-1)/2;
    setTotal(Total);
    // console.log((res.data.pin_count-1)/2,"axios");  
  }
  useEffect(() => { 
    data();
  },[]); 


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
        nwk,
        total
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
