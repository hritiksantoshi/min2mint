import { useState } from "react";
import { useModal } from "../utils/ModelContext";
import GlobalStyles from "../component/styles/GlobalStyle";
import Header from "../component/header/Header";
import Layout from "../component/common/layout/Layout";
import Banner from "../component/banner/Banner";
import Counter from "../component/counter/Counter";
import CharacterSlider from "../component/characterSlider/CharacterSlider";
import HowToMint from "../component/howToMint/HowToMint";
import About from "../component/about/About";
import RoadMap from "../component/roadMap/RoadMap";
import Team from "../component/team/Team";
import {Faq} from "../component/Faq"; 
import Footer from "../component/footer/Footer";
import MintNowModal from "../component/common/modal/mintNowModal/MintNowModal";
import WalletModal from "../component/common/modal/walletModal/WalletModal";
import MetamaskModal from "../component/common/modal/metamask/MetamaskModal";
import ConnectWallet from "../component/common/modal/metamask/ConnectWallet";
import Contact from "../component/contact/Contact"
import LoaderModal from "../component/common/modal/loaderModal";

const HomeV1 = () => {
  const {visibility,walletModalvisibility, metamaskModalVisibility, connectWalletModal,loading } = useModal();
  return (
    <Layout>
      
       <GlobalStyles />  
       {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
      {metamaskModalVisibility && <MetamaskModal/> }
      {connectWalletModal && <ConnectWallet/> }
      <LoaderModal/>
      <Header />
      <Banner />
      <Counter/>
      <CharacterSlider />
      <HowToMint />
      <About />
      <RoadMap /> 
      <Team />
      <Faq />
     <Contact />
      <Footer />
    </Layout>
  );
};

export default HomeV1;
