import { useModal } from "../../utils/ModelContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "./mobileMenu/MobileMenu";
import logo from "../assets/images/logo.png";
import { isMetaMaskInstalled } from '../../config';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  const { 
    walletModalHandle,
    metamaskModalHandle, 
    account, 
    isWalletAlreadyConnected, 
    disconnectWalletFromApp ,
    balance,
    nwk
  } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  const substr = (str, n) =>{
    return str.length > n ? str.substr(0, n -1)+"..."+str.substr(38,43) : str;
  }

  const handleWalletConnect = async () =>{
    if(!isMetaMaskInstalled()){
      metamaskModalHandle();
    }else{
      walletModalHandle();
    }
  }
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  useEffect(() => {
    isWalletAlreadyConnected();
  },[isWalletAlreadyConnected]);

  return (
    <NavWrapper className="bithu_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="bithu_menu_sect">
          <div className="bithu_menu_left_sect">
            <div className="logo">
              <a href="/">
                <img src={logo} alt="bithu nft logo" />
              </a>
            </div>
          </div>
          <div className="bithu_menu_right_sect bithu_v1_menu_right_sect">
            <div className="bithu_menu_list">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#roadmap">Roadmap</a>
                </li>
                <li>
                  <a href="#team">Team</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="https://blocktechbrew.com/">Contact</a>
                </li>
               
              </ul>
            </div>
            <div className="bithu_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
              <Button sm variant="outline" className="join_btn">
                <FaDiscord /> Join
              </Button>
              { account ?
              <Dropdown>
                <Dropdown.Toggle variant="white" id="dropdown-basic" className="connect_btn">
                {balance.substr(0,6)}{" "}{nwk}{" "}{"|"}{" "}{ substr(account.toString(), 6)}
                </Dropdown.Toggle>
          
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="# " onClick={() => disconnectWalletFromApp() }>Disconnect</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              :
              <Button
                sm
                variant="hovered"
                className="connect_btn"
                onClick={() => handleWalletConnect()}
              >
                <FaWallet />
                Connect
              </Button>

              }
            </div>
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
      </div>
    </NavWrapper>
  );
};

export default Header;
