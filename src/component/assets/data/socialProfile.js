import {
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
    FaTelegramPlane,
    FaFacebook,
    FaYoutube
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
      url: "https://twitter.com/blocktechbrew",
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/block-tech-brew/",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/blocktechbrew",
    },
    {
      icon: <FaInstagram />,
      url: "hhttps://www.instagram.com/blocktechbrew/?hl=en",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/channel/UCjAA9goFumPJDWeIMP12_lA",
    },
    {
      thumb: mediumIcon,
      url: "#",
    },
  ];
  
  export default data;
  