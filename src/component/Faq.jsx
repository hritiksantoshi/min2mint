import { FaMinus, FaPlus } from "react-icons/fa";
import faqBgThumb from "../component/assets/images/bg/faq_bg_wattermark.png";
import SectionTitle from "../component/common/sectionTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from "../component/common/Accordion";
import data from "../component/assets/data/faq";
import FAQStyleWrapper from "./styles/Faq.style";

export const Faq = () => {
  const handleExpand = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <FAQStyleWrapper className="bithu_faq_sect" id="faq">
      <div className="container">
        <div className="bithu_faq_content">
          <SectionTitle
            isCenter={true}
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="QUESTIONS & ANSWERS"
            className="text-center"
          />

          <div className="bithu_faq_questions">
            <Accordion className="faq_questions" allowZeroExpanded>
              {data?.map((item, i) => (
                <AccordionItem key={i}>
                  <AccordionTitle>
                    <h5>{item.title}</h5>
                    <IconWrapper>
                      <OpenIcon>
                        <FaMinus />
                      </OpenIcon>
                      <CloseIcon>
                        <FaPlus />
                      </CloseIcon>
                    </IconWrapper>
                  </AccordionTitle>
                  <AccordionBody >
                    <p>{item.text}</p>
                  </AccordionBody>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="faq_bg_wattermark">
              <img src={faqBgThumb} alt="bithu nft faq" />
            </div>
          </div>
        </div>
      </div>
    </FAQStyleWrapper>
  );
};


