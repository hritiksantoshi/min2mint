import { useModal } from "../../utils/ModelContext";
import Button from "../common/button/Button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../assets/images/nft/Character1.png";
import mintLiveDownArrow from "../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../assets/images/nft/mint_live_text.png";
import homeImageBG from "../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import { totalMintCount,getMaxSupply,whiteListUser } from "../../utils/web3mint";
import {db} from "../../firebase-config";
import {collection,doc,getDocs,updateDoc} from "firebase/firestore"
import { isMetaMaskInstalled } from '../../config';


const Banner = () => {
  const { mintModalHandle, connectWalletModalHanlde, account ,metamaskModalHandle} = useModal();
  const [remaining, setRemaining] = useState();
  const [total,setTotal] = useState();
  const [fireTotal,setfireTotal] = useState();
  const [minted,setMinted] = useState();
  const userCollectionRef = collection(db,"nfts");
  let collectionId;
  
  
  const data = async () => {
    try {
      const res = await getMaxSupply();
      setTotal(parseInt(res._hex, 16));
    } catch (error) {
      console.log(error);
    }  
  }

  useEffect(() => {
    data();
    calculateRemainingItems();
   
});
  
  // const update = async () =>{
  //   const updata = await getDocs(userCollectionRef);
  //   updata.forEach((doc) => {
      
  //   }); 
  // }
  useEffect(() => {
   const getNfts = async () => {
    const lastData = await getDocs(userCollectionRef);
    lastData.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setfireTotal(doc.data().Total);
      setMinted(doc.data().Minted);
       collectionId = doc.id;
    }); 
    //  console.log(collectionId,"updoc");
    
  };
   getNfts();
  },[])

  const calculateRemainingItems = async () => {
    let totaltMintedItems = await totalMintCount();
    setRemaining(parseInt(totaltMintedItems._hex, 16));
      // await whiteListUser("0x25F8486AC4641DD6e7443B852c0a1032BbC3182a");
      let updoc = doc(db,"nfts",collectionId); 
    if(remaining != minted){
      await updateDoc(updoc,{"Minted":remaining})
      
    }  
  };
  
  const mintNowHandle = async () => {
    if(!isMetaMaskInstalled()){
      metamaskModalHandle();
    }else{
      connectWalletModalHanlde();
    }
  }
  
 
  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="bithu_v1_baner_left">
              <h2>Crazy Meta 🎯 NFT collections</h2>
              <h3>
                <span className="count">{remaining?remaining:minted}</span> / {total?total:fireTotal} Minted
              </h3>
              <div className="sweet-loading"></div>
              <div className="banner_buttons">
                {account ? (
                  <Button lg variant="mint" onClick={() => mintModalHandle()}>
                    {" "}
                    Mint now
                  </Button>
                ) : (
                  <Button
                    lg
                    variant="mint"
                    onClick={() => mintNowHandle()}
                  >
                    {" "}
                    Mint now
                  </Button>
                )}

                {/* <Button lg variant="outline">
                  Wishlist now
                </Button> */}
              </div>
              <div className="coin-info">
                <span>Max 3 NFTs per wallet . Price 0.09 ETH + gas</span>
                <span>
                  MINT IS LIVE{" "}
                  <span className="highlighted">UNTIL 25 APR 04:00H</span>
                </span>
                <span>Presale : SOLDOUT</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bithu_v1_baner_right">
              <div className="bithu_v1_baner_right_img_sect">
                <div className="mint_live_circle_sect">
                  <div className="mint_live_circle">
                    <span>
                      <img src={mintLiveDownArrow} alt="" />
                    </span>
                    <span className="mint_live_text rotated-style">
                      <img src={mintLiveText} alt="" />
                    </span>
                  </div>
                </div>
                <div className="bithu_v1_baner_right_img_bg">
                  <img src={homeImageBG} alt="" />
                </div>
                <div className="bithu_v1_baner_right_img">
                  <img src={characterThumb} alt="avater" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;
