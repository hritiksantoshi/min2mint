import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import phoneIcon from "../assets/images/icon/call-outgoing.svg";
import msgIcon from "../assets/images/icon/sms-notification.svg";
import ContactStyleWrapper from "./Contact.style";
import ReCAPTCHA from "react-google-recaptcha";
const Contact = () => {

  const SERVICE_ID = "service_ja14xje";
  const TEMPLATE_ID = "template_ht5vyqg";
  const USER_ID = "kCkYmHBOK7o4GZhxd";

  const [msg, setmsg] = useState("");
  const [phonemsg, setphonemsg] = useState("");
  const [phone, setphone] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: "Ooops, something went wrong",
          text: error.text,
        })
      });
    e.target.reset()
  };

  const validEmail = (e) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(e.target.value)) {
      setmsg("");
    } else if (e.target.value == "") {
      setmsg("");
    } else {
      setmsg("Email is not valid");
    }
  };

  const validPhone = (e) => {
    if (e.target.value == "") {
      setphone("");
      setphonemsg("Phone is Required");
    } else if (
      Number.isInteger(Number(e.target.value)) &&
      e.target.value.length <= 10
    ) {
      setphone(e.target.value);
      setphonemsg(
        e.target.value.length === 10
          ? ""
          : "Phone number must be atleast 10 numbers"
      );
    } else if (!Number.isInteger(e.target.value)) {
      setphonemsg("Invalid phone number. Please try again.");
    }
  };

  return (
    <>
      <ContactStyleWrapper id="contact">
        <div className="container">
          <div className="section_tag_line">
            <h2 className="text-uppercase">CONTACT US</h2>
            <h4 className="text-uppercase">SAY HELLO !</h4>
            <h2 className="text-uppercase">
              We’d pleased To <br />
              Hear From You{" "}
            </h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="left_content">
                <form onSubmit={handleOnSubmit}>
                  <div className="form_box">
                    <label htmlFor="name">YOUR Name *</label>
                    <input
                      type="text"
                      placeholder="e.g.  Roe Smith"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form_box">
                    <label htmlFor="mail">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g.  example@gmail.com"
                      name="mail"
                      onChange={validEmail}
                      required
                    />
                  </div>
                  {msg && <p>{msg}</p>}
                  <div className="form_box">
                    <label htmlFor="phnNo">Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g.  +55 365 256 2556"
                      name="phnNo"
                      value={phone}
                      onChange={validPhone}
                      required
                    />
                  </div>
                  {phonemsg && <p>{phonemsg}</p>}
                  <div className="form_box">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      name="message"
                      placeholder="Type your Message"
                      required
                    ></textarea>
                  </div>
                  <ReCAPTCHA className="cap" sitekey="6Lc_ziIjAAAAAGVSdWzeewXlPc9r9i5c2Mht5bqZ"   />
                  <Button variant="primary" size="lg" type="submit">
                    Submit Now
                  </Button>{" "}
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div className="right_content">
                <h4 className="uppercase widget_title">Contact Info</h4>
                <div className="contact_address_info">
                  <span>
                    <img src={phoneIcon} alt="icon" className="img-fluid" />
                  </span>
                  <div className="contact_info_text">
                    <h5>Call us</h5>
                    <p>Mobile: (+61) - 1990 - 6886</p>
                    <p>Hotline: 1800 - 1102</p>
                  </div>
                </div>

                <div className="contact_address_info">
                  <span>
                    <img src={msgIcon} alt="icon" className="img-fluid" />
                  </span>
                  <div className="contact_info_text">
                    <h5>Mail us</h5>
                    <p>Info: ask@domain.com</p>
                    <p>Support: wearehere@domain.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContactStyleWrapper>
    </>
  );
};

export default Contact;
