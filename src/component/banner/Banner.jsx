import { useModal } from "../../utils/ModelContext";
import Counter from "../common/counter/Counter";
import Button from "../common/button/Button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../assets/images/nft/Character1.png";
import mintLiveDownArrow from "../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../assets/images/nft/mint_live_text.png";
import homeImageBG from "../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import { totalMintCount,getMaxSupply } from "../../utils/web3mint";
import axios from "axios";
const Banner = () => {
  const { mintModalHandle, connectWalletModalHanlde, account } = useModal();
  const [remaining, setRemaining] = useState(0);
  const [total,setTotal] = useState(0);
  const calculateRemainingItems = async () => {
    let totaltMintedItems = await totalMintCount();
    setRemaining(parseInt(totaltMintedItems._hex, 16));
    // await getwhiteListUser("0xAf2FFfD3E5fa0A2C528a01cf8BcDa22b41e6769B");
  };

  // const config = {
  //   method: 'get',
  //   url: 'https://api.pinata.cloud/data/userPinnedDataTotal?hashContains=QmPgPX5vWwt282nVPD4BVvdLdWz92KWwyA6o54GWB6nQKG',
  //   headers: { 
  //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzE5YjA3ZC01YjdiLTQ3YTYtOWNmYy1iM2QwMjVlMmM3YzEiLCJlbWFpbCI6ImhyeHRvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTdlMzFjMGQ5MWRkMjhlM2U5NzMiLCJzY29wZWRLZXlTZWNyZXQiOiIzM2RmYTkxNGM5OWZlMjFlYzcyMWIzOWE0NmJiZDRmZGE3NWI3Mjc2OWM5NzdlZDMwNDA3Zjc3MzZkM2MzYmIxIiwiaWF0IjoxNjY4MzE0OTc0fQ.6sln8Kd7hwOOtJf_xu4PFeIxtUoytdpJhpTds5xpVJQ'
  //   }
  // };
  
  const data = async () => {
    try {
      const res = await getMaxSupply();
      // let total = (res.data.pin_count-1)/2;
      setTotal(parseInt(res._hex, 16));
      //  console.log((res.data),"axios"); 
    } catch (error) {
      console.log(error);
    }  
  }
  

  useEffect(() => {
      data();
      calculateRemainingItems();
     
  });
  
 
  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="bithu_v1_baner_left">
              <h2>Crazy Meta 🎯 NFT collections</h2>
              <h3>
                <span className="count">{remaining}</span> / {total} Minted
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
                    onClick={() => connectWalletModalHanlde()}
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
                <span>Max 2 NFTs per wallet . Price 0.09 ETH + gas</span>
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
