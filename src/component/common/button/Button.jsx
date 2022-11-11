import ButtonWrapper from "./Button.style";

{/*import buttonHoverShapeBlack from "../../assets/images/icon/button-hover-shape.svg";
import buttonHoverShapeWhite from "../../assets/images/icon/hov_shape_s.svg";*/}

const Button = ({ children, ...props }) => {
  return (
    <ButtonWrapper type="submit" className="bithu-btn" {...props}>
      {children}

      <img
        src={"https://bithu-sol-landing.vercel.app/static/media/hov_shape_s.ab94770525c55314d81a2a8fbe129601.svg"}
        className="hover-shape shape-left shape-white"
        alt="bithu nft button hover shape"
      />
      <img
        src={"https://bithu-sol-landing.vercel.app/static/media/hov_shape_s.ab94770525c55314d81a2a8fbe129601.svg"}
        className="hover-shape shape-right shape-white"
        alt="bithu nft button hover shape"
      />
      <img
        src={"https://bithu-sol-landing.vercel.app/static/media/button-hover-shape.f2ab9dd7826838eb77a01cbe82c988f2.svg"}
        className="hover-shape shape-left shape-black"
        alt="bithu nft button hover shape"
      />
      <img
        src={"https://bithu-sol-landing.vercel.app/static/media/button-hover-shape.f2ab9dd7826838eb77a01cbe82c988f2.svg"}
        className="hover-shape shape-right shape-black"
        alt="bithu nft button hover shape"
      />
    </ButtonWrapper>
  );
};

export default Button;
