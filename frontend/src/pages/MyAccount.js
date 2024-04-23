import React, { Component } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styles from "../assets/styles/MyAccount.module.css";
import * as API from '../services/api';
import { Logo, Footer, GoBackBtn} from './CommonComponents';
import {converter} from '../services/currencyConverter';


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
                            <td> Blondell </td>
                            <td> +44873425431</td>                          
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.AccTableHeads}> Lastname(s): </td>
                            <td className={styles.AccTableHeads}> Email Address: </td>                          
                        </tr>
                        <tr>
                            <td> Bartell</td>
                            <td> Blondell.Bartell@emailservice.co.uk</td>                          
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.AccTableHeads}> Account ID: </td>
                            <td className={styles.AccTableHeads}> Home Address: </td>                          
                        </tr>
                        <tr>
                            <td> 66512652</td>
                            <td> 72 Richard Road, Oxford, United Kingdom</td>                          
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
                    <form>
                        <table className={styles.AccInfoTable}>
                            <tr>
                                <td className={styles.AccTableHeads}> Colour Correction: </td>
                                <td className={styles.AccTableHeads}> Primary Currency: </td>                          
                            </tr>
                            <tr>
                                <td> 
                                    <select className={styles.AccTableDropdown} id="ColourCorrection">
                                        <option value="0">Off</option>
                                        <option value="1">Protanopia</option>
                                        <option value="2">Deuteranopia</option>
                                        <option value="3">Tritanopia</option>
                                    </select>
                                </td>
                                <td>
                                    <select className={styles.AccTableDropdown} id="Currency">
                                        <option value="1">CNY</option>
                                        <option value="2">EUR</option>
                                        <option value="3" selected="selected">GBP</option>
                                        <option value="4">HKD</option>
                                        <option value="5">JPY</option>
                                        <option value="6">USD</option>
                                    </select>
                                </td>                          
                            </tr>
                        </table>
                        <br/>
                        <input className={styles.AccTableSubmit} type="submit" value="Save Changes"></input>
                    </form>
                    
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
        </div>
    );
}
  
  export default MyAccount;