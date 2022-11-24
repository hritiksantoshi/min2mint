import { useState ,useEffect} from "react";
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
  const [value, setValue] = useState();

  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    msg: ""
  });

  const [validation, setValidation] = useState({
    name: "",
    email: "",
    phone: "",
    msg: ""
  });
  
  const [touched,setTouched] = useState(false);
  //handle submit updates
  function handleChange(event) {
    setTouched(true);
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;

    //first Name validation
    if (!inputValues.name) {
      errors.name = "First name is required";
    } else {
      errors.name = "";
    }
    //last Name validation
    if (!inputValues.msg ) {
      errors.msg = "msg is required";
    } else {
      errors.msg = "";
    }

    // email validation
    const emailCond =
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond) && inputValues.email.includes(".com",".net")) {
      errors.email = "Please put a valid email address";
    } else {
      errors.email = "";
    }
    setValidation(errors);
  };

  useEffect(() => {
    if(touched){
        
    }
    checkValidation();
  }, [inputValues]);

 
  const handleOnSubmit = (e) => {
  
    e.preventDefault();
  
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
      e.target.reset();
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
                      onChange={handleChange}
                        value={inputValues.name}
                        required
                    />
                  </div>
                  {validation.name && <p>{validation.name}</p>}
                  <div className="form_box">
                    <label htmlFor="mail">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g.  example@gmail.com"
                      name="mail"
                      onChange={(e) => handleChange(e)}
                      value={inputValues.email}
                    />
                  </div>
                  {validation.email && <p>{validation.email}</p>}
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
                        name="phone"
                       onChange={setValue}
                       error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                       />
                          
                  </div>
                  {value ? (isValidPhoneNumber(value) ? undefined :  <span style={{fontWeight: 'bold',color: 'red'}}>Invalid Phone number</span>) : <p></p>}
                  <div className="form_box">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      name="msg"
                      placeholder="Type your Message"
                      onChange={(e) => handleChange(e)}
                      value={inputValues.msg}
                    ></textarea>
                  </div>
                  {validation.msg && <p>{validation.msg}</p>}
                  <ReCAPTCHA className="cap" sitekey="6Le-XiYjAAAAAD5FzOW8YvHDdoPCgSxo7AzK5qp6"  type="image" />
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
