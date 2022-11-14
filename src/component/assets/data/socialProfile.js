import {
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
    FaTelegramPlane,
    FaFacebook,
  } from "react-icons/fa";
  
  import openseaIcon from "../images/icon/opensea.svg";
  import mediumIcon from "../images/icon/med.svg";
  
  const data = [
    {
      thumb: openseaIcon,
      url: "https://opensea.io/login",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com/",
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/login",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/",
    },
    {
      icon: <FaTelegramPlane />,
      url: "https://web.telegram.org/?legacy=1#/login",
    },
    {
      thumb: mediumIcon,
      url: "#",
    },
  ];
  
  export default data;
  