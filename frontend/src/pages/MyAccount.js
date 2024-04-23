import React, { Component } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styles from "../assets/styles/MyAccount.module.css";
import * as API from '../services/api';
import { Logo, Footer, GoBackBtn} from './CommonComponents';


function Head({ name, id }) {
    return (
        <div className={styles.headBar}>
            <GoBackBtn name={name} id={id} />
            <Logo />
        </div>
    );
}

function Mid({name, id}) {
    
    return (
        <div className={styles.midBody}>
            <div className={styles.midHigh} />
            <div className={styles.midLow} />
            <div className={styles.midCenter}>
                
            </div>
        </div>
        
    )
}


function MyAccount() {
    const location = useLocation();
    const name = location.state?.name || "You need to login";
    const id = location.state?.id;
    return (
        <div>
            <Head />
            <Mid />
            <Footer />
        </div>
    );
}
  
  export default MyAccount;