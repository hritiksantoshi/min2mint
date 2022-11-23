import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import phoneIcon from "../assets/images/icon/call-outgoing.svg";
import msgIcon from "../assets/images/icon/sms-notification.svg";
import ContactStyleWrapper from "./Contact.style";
import ReCAPTCHA from "react-google-recaptcha";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

const Contact = () => {

  const SERVICE_ID = "service_ja14xje";
  const TEMPLATE_ID = "template_ht5vyqg";
  const USER_ID = "kCkYmHBOK7o4GZhxd";
  const [name,setname] = useState(false);
  const [nameErr,setnameErr] = useState("");
  const [msg,setmsg] = useState(false);
  const [msgErr,setmsgErr] = useState("");
  const [email,setemail] = useState(false);
  const [emailerr, setemailerr] = useState("");
  const [phonemsg, setphonemsg] = useState("");
  const [phone, setphone] = useState(false);
  const [value, setValue] = useState();
  const handleOnSubmit = (e) => {
    if(!name){
      setnameErr(" name is required")
    } else if(!email){
      setnameErr("");
      setemailerr("email is required");
    } else if(!msg){
      setemailerr("");
      setmsgErr("msg is required");
    }

    e.preventDefault();
    if(name && email && msg && emailerr == "" && isValidPhoneNumber(value)){
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Thanks for contacting us',
          text: 'Your query will be answered within 48 hrs.' 
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
    }
    
  };


  const handlename = (e) =>{
    if(e.target.value == ""){
      setnameErr("name is required");
    }
    else{
      setnameErr("");
      setname(true)
    }
  }

  const handlemsg = (e) =>{
    if(e.target.value == ""){
      setmsgErr("message is required");
    }
    else{
      setmsgErr("");
      setmsg(true)
    }
  }
  


  const validEmail = (e) => {
    let mail = e.target.value;
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(mail) && mail.includes('.com','.org')) {
      setemailerr("");
      setemail(true);
    }  else if (mail == "") {
      setemailerr("email is required");
    } else {
      setemailerr("Email is not valid");
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
                <form onSubmit={handleOnSubmit} method="POST">
                  <div className="form_box">
                    <label htmlFor="name">YOUR Name *</label>
                    <input
                      type="text"
                      placeholder="e.g.  Roe Smith"
                      name="name"
                      onChange={handlename}
                    />
                  </div>
                  <span style={{color: 'red'}}>{nameErr}</span>
                  <div className="form_box">
                    <label htmlFor="mail">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g.  example@gmail.com"
                      name="mail"
                      onChange={validEmail}
                     
                    />
                  </div>
                  <span style={{color: 'red'}}>{emailerr}</span>
                  <div className="form_box">
                    <label htmlFor="phnNo">Phone Number</label>
                    {/* <input
                      type="text"
                      placeholder="e.g.  +55 365 256 2556"
                      name="phnNo"
                      value={phone}
                      onChange={validPhone}
                      required
                    /> */}
                    <PhoneInput
                        defaultCountry="IN"
                        value={value}
                       onChange={setValue}
                       error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                       />
                          
                  </div>
                  {value ? (isValidPhoneNumber(value) ? undefined :<span style={{color: 'red'}}>Invalid Phone number</span>) : <p></p>}
                  {/* {phonemsg && <p>{phonemsg}</p>} */}
                  <div className="form_box">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      name="message"
                      placeholder="Type your Message"
                      onChange={handlemsg}
                    ></textarea>
                     <span style={{color: 'red'}}>{msgErr}</span>
                  </div>
                  <ReCAPTCHA className="cap" sitekey="6Le-XiYjAAAAAD5FzOW8YvHDdoPCgSxo7AzK5qp6" type="image" />
                  <Button variant="primary" size="lg" type="submit">
                  <h4 style={{paddingTop:7}}>  Submit Now </h4>
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
                    <p>Mobile:+91 874-590-9990</p>
                    <p>Hotline: 1800 - 1102</p>
                  </div>
                </div>

                <div className="contact_address_info">
                  <span>
                    <img src={msgIcon} alt="icon" className="img-fluid" />
                  </span>
                  <div className="contact_info_text">
                    <h5>Mail us</h5>
                    <p>Info: blocktechbrew.com</p>
                    <p>Support: business@blocktechbrew.com</p>
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
