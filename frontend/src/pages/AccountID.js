// AccountID.js
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../assets/styles/AccountID.css';

function Head(){
    const history = useHistory();

    function handleBackClick(){
        history.push('/HomePage');
    }

    return(
        <div className={styles.head_bar}>
          {/* Logo */}
          <div className={styles.head_center}>
            <img src="/images/Logo.png" className={styles.head_img} alt="Logo" />
          </div>
 
          {/* Back */}
          <div className={styles.head_back_container}>
            <button onClick={handleBackClick} className={styles.back_btn}>
              <img src="/images/back.png" alt="Back" className={styles.back_img}/>
            </button>
          </div>

        </div>
    );
}

function Mid(){

    return(
        <div className={styles.mid-bar}>

          {/* Account ID */}
        <div className={styles.mid_high}>
          <div className={styles.mid-high-txt-left}>
            <h1>Account ID</h1>
          </div>
        </div>
        </div>
    );
}

function Low({setAccountID}){
    const [newAccountID, setNewAccountID] = useState('');
    const handleChangeAccountIDClick = () => {
        // Call the setAccountID function with the newAccountID value
        // Clear the input field after changing the Account ID
        setAccountID(newAccountID);
        setNewAccountID('');
      };
      
    return(
        <div className={styles.low-bar}>
            {/* The change of Account ID */}
          <div className={styles.low-center}>
             {/* Container for Account ID input, form control, and change container */}
            <div className={styles.account-container}>
              <div className={styles.AccountID-input}>Now the Account ID is:</div>
              <input
                type="accountID"
                className="form-control"
                aria-label="New AccountID"
                value={newAccountID}
                onChange={(e) => setNewAccountID(e.target.value)}
              />
              {/* Button to trigger the change of Account ID */}
             <div className={styles.low_change_container}>
               <button onClick={handleChangeAccountIDClick} className={styles.change_btn}>
                 <img src="/images/change.png" alt="ChangeAccountID" className={styles.change_img}/>
               </button>
             </div>
            </div>
            <p className={styles.low-box-txt-line}>
                Change your Account ID with Upper
            </p>
            <p className={styles.low-box-txt-line}>
                and Lower case letters and 0-9
            </p>
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

  function AccountID() {
    return (
      <div>
        <Head />
        <Mid />
        <Low/>
        <Footer />
      </div>
    );
  }
  
  export default AccountID;