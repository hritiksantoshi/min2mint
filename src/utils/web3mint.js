import contract from "../contracts/bithuabi.json";
import { ethers } from "ethers";
import { isMetaMaskInstalled, ethereum,isWalletConnected } from "../config";
import {  toast } from 'react-toastify';
export const mint = async (mint_amount,setloading) => {
  try {
    if (isMetaMaskInstalled()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
      const nftContract = new ethers.Contract(
        contractAddress,
        contract,
        signer
      );
      let limit = await nftContract.USERLIMIT();
      let walletMints = await nftContract.maxWalletMints( ethereum.selectedAddress);
      if(walletMints >= limit){
        toast.error('Max NFT per Wallet limit reached', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }

      let txnHash = await nftContract.mint(
        ethereum.selectedAddress,
        mint_amount,
        {
          gasLimit: "310000",
          value: ethers.utils.parseEther((0.03 * mint_amount).toString()),
        });

       console.log(txnHash,"txnHash");

        if(txnHash){
        toast.info('Minting in Process...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setloading(false);
          }
     
      console.log(txnHash,"Hash");
      const txReceipt = await provider.waitForTransaction(
        `${txnHash.hash}`,
        1,
        300000
      );



      // console.log(txReceipt,"txReceipt");
      if (txReceipt && txReceipt.blockNumber) {
        console.log(txReceipt,"receipt");
        return txReceipt;
      }
    }
  } catch (err) {
    console.log(err, "not done");
    toast.error('Transaction Rejected', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }
};

export const totalMintCount = async () => {
  if (isMetaMaskInstalled()) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
    const nftContract = new ethers.Contract(contractAddress, contract, signer);
    let totalMint = await nftContract.count();
    return totalMint;
  }
};

export const whiteListUser = async (_user) => {
  try {
    if(isMetaMaskInstalled()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
      const nftContract = new ethers.Contract(contractAddress, contract, signer);
      let user = await nftContract.whitelistUser(_user);
      console.log(user,"whitelisted");
      return user
    }
  } catch (error) {
    console.log(error,"whitelisterror");
  }
 
}

export const getwhiteListUser = async (_user) => {
  try {
    if(isMetaMaskInstalled()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
      const nftContract = new ethers.Contract(contractAddress, contract, signer);
      let user = await nftContract.whitelisted(_user);
      console.log(user,"whitelisted");
      return user
    }
  } catch (error) {
    console.log(error,"whitelisterror");
  }
 
}

export const getPrice = async () => {
  try {
    if(isMetaMaskInstalled()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
      const nftContract = new ethers.Contract(contractAddress, contract, signer);
      let price = await nftContract.cost();
      let Fprice = ethers.utils.formatEther(price);
      // console.log(price,"removed");
      return Fprice
    }
  } catch (error) {
    console.log(error,"costerror");
  }
 
}

export const getMaxSupply = async () => {
  try {
    if(isWalletConnected()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xC0b47Aa657e407b4d8e9057F42C4CC52744C2B4D";
      const nftContract = new ethers.Contract(contractAddress, contract, signer);
      let supply = await nftContract.maxSupply();
      return supply
    }
  } catch (error) {
    console.log(error,"supplyerror");
  }
 
}
