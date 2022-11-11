

import SectionTitleWrapper from "./SectionTitle.style";

const SectionTitle = ({ title, subtitle, isCenter, ...props }) => {
  return (
    <SectionTitleWrapper {...props}>
      {subtitle && (
        <h2>
          {isCenter ? <img src={"https://bithu-sol-landing.vercel.app/static/media/title_shapes2.0bf23547bc0da0226bd6b64ca3b2b044.svg"} alt="" /> : ""}
          {subtitle}{" "}
          <img src={"https://bithu-sol-landing.vercel.app/static/media/title_shapes.66d7b59c6c825644c15246d86fed1f61.svg"} alt="bithu nft section title shape" />{" "}
        </h2>
      )}
      {title && <h3>{title}</h3>}
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
