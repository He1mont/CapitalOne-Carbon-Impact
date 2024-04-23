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
                <div className={styles.centerContainer}>
                    <div className={styles.titleText}>My Account</div>
                    <div className={styles.sectionHeader}>Personal</div>
                    <table className={styles.AccInfoTable}>
                        <tr>
                            <td className={styles.AccTableHeads}> Firstname(s): </td>
                            <td className={styles.AccTableHeads}> Phone Number: </td>                          
                        </tr>
                        <tr>
                            <td> Benji </td>
                            <td> +44 1234 567890</td>                          
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.AccTableHeads}> Lastname(s): </td>
                            <td className={styles.AccTableHeads}> Email Address: </td>                          
                        </tr>
                        <tr>
                            <td> Goringe</td>
                            <td> email@email.com</td>                          
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.AccTableHeads}> Account ID: </td>
                            <td className={styles.AccTableHeads}> Home Address: </td>                          
                        </tr>
                        <tr>
                            <td> 12345678</td>
                            <td> house, AB1 2CD</td>                          
                        </tr>
                    </table>
                    <div className={styles.sectionHeader}>Transactions</div>
                    <table className={styles.AccInfoTable}>
                        <tr>
                            <td className={styles.AccTableHeads}> First Transaction: </td>
                            <td className={styles.AccTableHeads}> Completed Transactions</td>                          
                        </tr>
                        <tr>
                            <td> 03/08/2023</td>
                            <td> 48</td>                          
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.AccTableHeads}> Most Recent Transaction: </td>
                            <td className={styles.AccTableHeads}> Value of Transactions</td>                          
                        </tr>
                        <tr>
                            <td> 21/04/2024</td>
                            <td> $2,123</td>                          
                        </tr>
                    </table>
                    <div className={styles.sectionHeader}>Additional Options</div>
                    <table className={styles.AccInfoTable}>
                        <tr>
                            <td className={styles.AccTableHeads}> Colour Correction: </td>
                            <td className={styles.AccTableHeads}> Primary Currency: </td>                          
                        </tr>
                        <tr>
                            <td> 03/08/2023</td>
                            <td> 48</td>                          
                        </tr>
                    </table>
                </div>
                
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