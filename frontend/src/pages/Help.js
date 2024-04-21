import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../assets/styles/Help.module.css"; // Import CSS module
import Popup from "../components/popup";
import UsernamePopup from "../components/UsernamePopup";
import PasswordPopup from "../components/PasswordPopup";
import ContactPopup from "../components/ContactPopup";
import FAQ from "../components/FAQ";
// import { useCollapse } from "react-collapsed";
// import kommunicateChat from "../chat";
import axios from "axios";


/**
 * Collapsible component
 */
// function Collap(props) {
//   const config = {
//     defaultExpanded: props.defaultExpanded || false,
//     collapsedHeight: props.collapsedHeight || 0,
//   };
//   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
//   return (
//     <div className={styles.collapsible}>
//       <div className={styles.header} {...getToggleProps()}>
//         <div className={styles.title}>{props.title}</div>
//       </div>
//       <div {...getCollapseProps()}>
//         <div className={styles.content}>{props.children}</div>
//       </div>
//     </div>
//   );
// }
/**
 * Head component
 * Displays the top part of the help including the rgo.
 * Utilizes useHistory from react-router-dom for navigation.
 */
function Head() {
  const history = useHistory();
  function handleLoginClick() {
    history.push({
      pathname: "/",
    });
  }

  /**
   * handleLoginClick function
   * Redirects user to the login page when the login button is clicked.
   */
  return (
    <div className={styles.headBar}>
      {/* Logo */}
      <div className={styles.headCenter}>
        <img
          src="/images/Logo.png"
          className={styles.headImg}
          alt="Logo"
          onClick={handleLoginClick}
        />
      </div>
    </div>
  );
}
/**
 * Mid component
 * Displays the middle section of the help page, including user information and button redirecting to other pages.
 */
function Mid({ name }) {
  return (
    <div className={styles.midBar}>
      <div className={styles.midHigh}>
        {/* <h1 className={styles.title}>Help centre</h1> */}
      </div>
      {/* Carbon Impact Information Box */}
      <div className={styles.midCenter}>
        <img
          src="/images/help-center.png"
          className={styles.midBox}
          alt="Mid Box"
        />
      </div>

      {/* Help Button */}
      <div className={styles.midLow}></div>
    </div>
  );
}

/**
 * Low component
 * Displays the lower section of the help page, including buttons for transactions, goals, and history.
 */
function Low({ name, id }) {
  const history = useHistory();
  const [openPop, setOpen] = useState(false);
  const [openUsernamePopup, setOpenUsernamePopup] = useState(false);
  const [openContactPopup, setOpenContactPopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [openFAQPopup, setFAQPopup] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePasswordClick = () => {
    const text =
      "To change your username you should go to lorem ipsum dolor sit amet,  ...";
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  return (
    <div className={styles.lowBar}>
      <div className={styles.search}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
          <div className={styles.inputContainer}>
          <img src="images/search.png" alt="Info" className={styles.inputIcon}></img>
            <input
              type="text"
              className={styles.input}
              placeholder="Just say/ask something:"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          </div>
          <div>
            <button className={styles.submit} type="submit">Submit</button>
          </div>
        </form>
        <div>
          <p>{response}</p>
        </div>
      </div>
      <table className={styles.low_bar_tbl}>
        <tbody>
          <tr>
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={() => setOpen(true)}
              >
                <img
                  src="/images/about-us.png"
                  className={styles.low_bar_btn_img}
                  alt="About"
                />
                <h2 className={styles.low_bar_btn_title}> About us</h2>
                <p className={styles.low_bar_btn_sub}>
                  We are Team 7, entrusted with Capital One's project: carbon
                  impact of transactions...
                </p>
              </button>
              <Popup open={openPop} onClose={() => setOpen(false)} />
            </th>
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={() => setFAQPopup(true)}
              >
                <img
                  src="/images/FAQ.png"
                  className={styles.low_bar_btn_img}
                  alt="FAQ"
                />
                <h2 className={styles.low_bar_btn_title}> FAQS</h2>
                <p className={styles.low_bar_btn_sub}>
                  Frequently asked questions
                </p>
              </button>
              <FAQ open={openFAQPopup} onClose={() => setFAQPopup(false)} />
            </th>
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={() => setOpenPasswordPopup(true)}
              >
                <img
                  src="/images/password-icon-png-4.jpg"
                  className={styles.low_bar_btn_img}
                  alt="password"
                />
                <h2 className={styles.low_bar_btn_title}> Password recovery</h2>
                <p className={styles.low_bar_btn_sub}>
                  If you've forgotten your password or are having trouble
                  logging in...
                </p>
              </button>
              <PasswordPopup
                open={openPasswordPopup}
                onClose={() => setOpenPasswordPopup(false)}
              />
            </th>
          </tr>
          <br></br>
          <br></br>
          <tr>
            <th>
              <button
                onClick={() => setOpenUsernamePopup(true)}
                className={styles.low_bar_btn}
              >
                <img
                  src="/images/account.png"
                  className={styles.low_bar_btn_img}
                  alt="username"
                />
                <h2 className={styles.low_bar_btn_title}>
                  Changing your username
                </h2>
                <p className={styles.low_bar_btn_sub}>
                  To change your username you should go into your account
                  settings...
                </p>
              </button>
              <UsernamePopup
                open={openUsernamePopup}
                onClose={() => setOpenUsernamePopup(false)}
              />
            </th>
            <th>
              <button className={styles.low_bar_btn}>
                <img
                  src="/images/ticket.png"
                  className={styles.low_bar_btn_img}
                  alt="ticker"
                />
                <h2 className={styles.low_bar_btn_title}> Create a ticket</h2>
                <p className={styles.low_bar_btn_sub}>
                  Frequently asked questions
                </p>
              </button>
            </th>
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={() => setOpenContactPopup(true)}
              >
                <img
                  src="/images/contact-us.png"
                  className={styles.low_bar_btn_img}
                  alt="contact"
                />
                <h2 className={styles.low_bar_btn_title}> Contact us</h2>
                <p className={styles.low_bar_btn_sub}>
                  We're here to assist you with any questions, concerns, or
                  feedback you may...
                </p>
              </button>
              <ContactPopup
                open={openContactPopup}
                onClose={() => setOpenContactPopup(false)}
              />
            </th>
          </tr>
        </tbody>
      </table>

      {/* <kommunicateChat /> */}

      {/* <div className={styles.helpTable}>
        <div className={styles.helpTableTitle}>Profile Help</div>
        <Collap title="Changing Username">
          <label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </label>
          <button
            className={styles.play_button}
            onClick={handleUsernameClick}
          ></button>
        </Collap>
        <Collap title="Password Recovery">
          <label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </label>
          <button
            className={styles.play_button}
            onClick={handlePasswordClick}
          ></button>
        </Collap>
        <Collap title="How do I ">
          <label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </label>
          <button className={styles.play_button}></button>
        </Collap>

        <div className={styles.helpTableTitle}>Site Help</div>
        <Collap title="How do I ">
          <label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </label>
          <button className={styles.play_button}></button>
        </Collap>
        <Collap title="How do I ">
          <label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </label>
          <button className={styles.play_button}></button>
        </Collap>

        <div className={styles.break} />
        
      </div> */}
    </div>
  );
}

/**
 * Footer component
 * Displays the footer of the homepage, including copyright information.
 */
function Footer() {
  return (
    <div className={styles.footer}>
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}

function Help() {
  const history = useHistory();
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;

  useEffect(() => {
    console.log("Executing useEffect");

    // Check if Kommunicate script is already loaded
    if (window.kommunicate) {
        console.warn("Kommunicate script is already loaded.");
        return;
    }
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"4ff9d4f79551f6d18d4b7ae38565b9b4","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
}, []); 

  return (
    <div>
      <Head />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default Help;
