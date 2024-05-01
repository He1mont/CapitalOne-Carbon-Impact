// Help.js
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";  // Axios for HTTP requests
import styles from "../assets/styles/Help.module.css";    // Import style
import Popup from "../components/popup";                  // Import Popup 
import UsernamePopup from "../components/UsernamePopup";  // Import Popup for username-related actions
import PasswordPopup from "../components/PasswordPopup";  // Import Popup for password recovery
import Tickets from "../components/Ticket";               // Import Component for ticket creation
import { Logo, GoBackBtn, Footer } from "./CommonComponents"; // Reusable components across pages

/**
 * Head component that renders the logo and go-back button at the top of the Help page.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Head({ name, id }) {
  return (
    <div className={styles.headBar}>
      <Logo />
      <GoBackBtn name={name} id={id} />
    </div>
  );
}

/**
 * Mid component for displaying static content in the Help page middle section.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Mid() {
  return (
    <div className={styles.midBar}>
      <div className={styles.midHigh}>
      </div>
      {/* Carbon Impact Information Box */}
      <div className={styles.midCenter}>
        <img
          src="/images/help-center.png"
          className={styles.midBox}
          alt="Mid Box"
        />
      </div>
      <div className={styles.midLow}></div>
    </div>
  );
}

/**
 * ResponsePopup component to display responses in a modal dialog.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function ResponsePopup({ open, onClose, response }) {
  console.log("Response prop:", response);
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.popupContainer}
      >
        {/* Logo */}
        <img src="/images/Logo.png" alt="" className={styles.img} />

        {/* Close button */}
        <div className={styles.popupRight}>
          <p onClick={onClose} className={styles.closeBtn}>
            x
          </p>
        </div>

        {/* Popup content */}
        <div className={styles.content}>
          <br></br>
          <br></br>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Low component that handles user interactions and displays dynamic responses or actions.
 * Includes functionality to submit queries and display various popups.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Low({ name, id }) {
  const history = useHistory();
  // State hooks to manage visibility of various popups
  const [openPop, setOpen] = useState(false);
  const [openUsernamePopup, setOpenUsernamePopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [openTicketPopup, setTicketPopup] = useState(false);

  // State for managing user input and server responses
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  // Handles the submission of the chat form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/chat", {
        prompt,
      });
      console.log("API Response:", data);
      // Use the response directly from the backend
      setResponse(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Navigation handler for FAQs
  function handleFAQ() {
    if (id === undefined) {
      history.push({
        pathname: "/help/FAQS",
        search: "prevPage=login",
      });
    } else {
      history.push({
        pathname: "/help/FAQS",
        state: { name: name, id: id },
      });
    }
  }

  // Handler to open external user manual
  function handleUserManual() {
    window.open("https://su-guo.notion.site/e7b9a642a83d467bb8b62cba73e02578?v=4d1ca443210843ddabeff5a269a84ac4", "_blank");
  }

  return (
    <div className={styles.lowBar}>
      {/* Search form for user queries */}
      <div className={styles.search}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <div className={styles.inputContainer}>
              <img
                src="images/search.png"
                alt="Info"
                className={styles.inputIcon}
              ></img>
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
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Table for navigation and utility buttons */}
      <table className={styles.low_bar_tbl}>
        <tbody>
          <tr>
            {/* About us section with popup */}
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

            {/* FAQ section */}
            <th>
              <button className={styles.low_bar_btn} onClick={handleFAQ}>
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
            </th>

            {/* Password recovery section with popup */}
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
          <tr>
            {/* Seeing account details section with popup */}
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
                  Seeing your account details
                </h2>
                <p className={styles.low_bar_btn_sub}>
                  To see your account information you should go click...
                </p>
              </button>
              <UsernamePopup
                open={openUsernamePopup}
                onClose={() => setOpenUsernamePopup(false)}
              />
            </th>

            {/* Create a ticket section with popup */}
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={() => setTicketPopup(true)}
              >
                <img
                  src="/images/ticket.png"
                  className={styles.low_bar_btn_img}
                  alt="ticker"
                />
                <h2 className={styles.low_bar_btn_title}> Create a ticket</h2>
                <p className={styles.low_bar_btn_sub}>
                  If you're experiencing issues, try asking the chatbot for help
                  with prompts like...
                </p>
              </button>
              <Tickets
                open={openTicketPopup}
                onClose={() => setTicketPopup(false)}
              />
            </th>

            {/* User Manual link */}
            <th>
              <button
                className={styles.low_bar_btn}
                onClick={handleUserManual}>
                <img
                  src="/images/linkToUserManual.png"
                  className={styles.low_bar_btn_img}
                  alt="User Manual"
                />
                <h2 className={styles.low_bar_btn_title}>User Manual</h2>
                <p className={styles.low_bar_btn_sub}>
                  Check our detailed user guide for more information.
                </p>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      <ResponsePopup open={response !== ""} onClose={() => setResponse("")} response={response} />
    </div >
  );
}

/**
 * Help component that aggregates all sub-components (Head, Mid, Low, Footer) into the Help page.
 * It also manages loading of external scripts for chat functionalities.
 */
function Help() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;

  // React effect for loading external chat widget script only once after the component mounts
  useEffect(() => {
    console.log("Executing useEffect");

    // Check if Kommunicate script is already loaded
    if (window.kommunicate) {
      console.warn("Kommunicate script is already loaded.");
      return;
    }

    // Load the Kommunicate chat widget script dynamically and configure it
    (function (d, m) {
      var kommunicateSettings = {
        appId: "1051cabdc243ee6454658b09be71080da",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      // Insert script tag for Kommunicate chat widget into the document head
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;   // Initialize global settings for the chat widget
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default Help;
