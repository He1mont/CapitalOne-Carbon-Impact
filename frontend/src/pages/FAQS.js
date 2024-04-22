import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../assets/styles/FAQ.module.css"; // Import CSS module
import { useCollapse } from "react-collapsed";
import axios from "axios";

/**
 * Collapsible component
 */
function Collap(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className={styles.collapsible}>
      <div className={styles.header} {...getToggleProps()}>
        <div className={styles.title}>{props.title}</div>
      </div>
      <div {...getCollapseProps()}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
}

function Head() {
  const history = useHistory();
  function handleLoginClick() {
    history.push({
      pathname: "/",
    });
  }
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

function Low({ name, id }) {
    
        
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


    
    const history = useHistory();
    return (
      <div className={styles.lowBar}>
        <div className={styles.helpTable}>
          <div className={styles.helpTableTitle}>
            Frequently asked questions (FAQs)
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>1. How is my carbon impact calculated?</span>
              <button className={styles.play_button} onClick={handleqs1}></button>
            </div>
            <label>
              Our platform analyses transaction data, considering factors like
              merchant codes and transaction type, to calculate carbon emissions.
            </label>
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>2. How can I set carbon goals?</span>
              <button className={styles.play_button} onClick={handleqs2}></button>
            </div>
            <label>
              Setting carbon goals is easy! Navigate to your carbon goals page and
              specify monthly targets.
            </label>
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>3. Can I compare my carbon scores with friends?</span>
              <button className={styles.play_button} onClick={handleqs3}></button>
            </div>
            <label>
              Yes! Our platform offers a leaderboard table for comparing carbon
              scores with friends.
            </label>
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>4. How often are carbon scores updated?</span>
              <button className={styles.play_button}onClick={handleqs4}></button>
            </div>
            <label>
              Carbon scores are regularly updated based on the latest transaction
              data, providing real-time insights for informed decision-making.
            </label>
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>5. How does the platform work?</span>
              <button className={styles.play_button}onClick={handleqs5}></button>
            </div>
            <label>
              Our platform helps users understand and reduce their carbon
              footprint by providing insights into transactional environmental
              impact.
            </label>
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.question}>
              <span>6. Is my data secure on the platform?</span>
              <button className={styles.play_button}onClick={handleqs6}></button>
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
  

function Footer() {
  return (
    <div className={styles.footer}>
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}

function FAQS() {
  const history = useHistory();
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;

  return (
    <div>
      <Head />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default FAQS;
