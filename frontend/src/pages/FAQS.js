// FAQ.js
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../assets/styles/FAQ.module.css";         // Imports styles for FAQ components.
import { Logo, GoBackBtn, Footer } from "./CommonComponents"; // Import reusable components 

/**
 * Renders the header component with logo and go back button.
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
 * Middle section of the FAQ page, could potentially display dynamic content or images.
 */
function Mid() {
  return (
    <div className={styles.midBar}>
      {/* Carbon Impact Information Box */}
      <div className={styles.midCenter}>
        <img
          src="/images/faq-center.png"
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
 * Renders the lower part of the FAQ page that contains frequently asked questions.
 * Utilizes speech synthesis to vocalize answers when interacted with.
 */
function Low() {

  // Helper function to handle speech synthesis for FAQ answers.
  const handleqs1 = () => {
    const text =
      "1. How is my carbon impact calculated?  Our platform analyses transaction data, considering factors like merchant codes and transaction type, to calculate carbon emissions.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  const handleqs2 = () => {
    const text =
      "2. How can I set carbon goals?  Setting carbon goals is easy! Navigate to your carbon goals page and specify monthly targets.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  const handleqs3 = () => {
    const text =
      "3. Can I compare my carbon scores with friends?  Yes! Our platform offers a leaderboard table for comparing carbon scores with friends.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  const handleqs4 = () => {
    const text =
      "4. How often are carbon scores updated?  Carbon scores are regularly updated based on the latest transaction data, providing real-time insights for informed decision-making.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  const handleqs5 = () => {
    const text =
      "5. How does the platform work?  Our platform helps users understand and reduce their carbon footprint by providing insights into transactional environmental impact.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  const handleqs6 = () => {
    const text =
      "6. Is my data secure on the platform?  Absolutely. We prioritise the security and privacy of your data, utilising industry-standard encryption and strict adherence to data protection regulations.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    window.speechSynthesis.speak(value);
  };

  // Renders the questions and their corresponding answers within interactive containers.
  return (
    <div className={styles.lowBar}>
      <div className={styles.helpTable}>
        <div className={styles.helpTableTitle}>
          Frequently asked questions (FAQs)
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs1}></button>
            <span>1. How is my carbon impact calculated?</span>

          </div>
          <label>
            Our platform analyses transaction data, considering factors like
            merchant codes and transaction type, to calculate carbon emissions.
          </label>
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs2}></button>
            <span>2. How can I set carbon goals?</span>

          </div>
          <label>
            Setting carbon goals is easy! Navigate to your carbon goals page and
            specify monthly targets.
          </label>
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs3}></button>
            <span>3. Can I compare my carbon scores with friends?</span>

          </div>
          <label>
            Yes! Our platform offers a leaderboard table for comparing carbon
            scores with friends.
          </label>
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs4}></button>
            <span>4. How often are carbon scores updated?</span>

          </div>
          <label>
            Carbon scores are regularly updated based on the latest transaction
            data, providing real-time insights for informed decision-making.
          </label>
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs5}></button>
            <span>5. How does the platform work?</span>

          </div>
          <label>
            Our platform helps users understand and reduce their carbon
            footprint by providing insights into transactional environmental
            impact.
          </label>
        </div>
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
            <button className={styles.play_button} onClick={handleqs6}></button>
            <span>6. Is my data secure on the platform?</span>

          </div>
          <label>
            Absolutely. We prioritise the security and privacy of your data,
            utilising industry-standard encryption and strict adherence to data
            protection regulations.
          </label>
        </div>
        <div className={styles.break} />
      </div>
    </div>
  );
}

/**
 * The main FAQS component assembling all parts of the FAQ page.
 */
function FAQS() {
  const location = useLocation();
  
  // Extract username and accountID from route state
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default FAQS;
