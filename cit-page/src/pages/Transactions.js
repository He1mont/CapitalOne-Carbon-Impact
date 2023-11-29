import React from 'react';
import '../assets/styles/Transactions.css';
import '../utils/CreateRandomAccounts'
import CreateRandomAccount from '../utils/CreateRandomAccounts';

function Head() {
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src='CapitalOneLogo.png' className="head-img"/>
      </div>
    </div>
  )
}

function Mid() {
  return (
    <div className="mid-bar">
      <div className="mid-high">
        <div className="mid-high-txt-left">
          <p>Benjamin ... 1234</p>
          <h1>View Transactions</h1>
        </div>
        <div className="mid-high-profile">

        </div>
      </div>

      <div className="mid-center">
        <img src="mid-box.png" className="mid-box"/>
        <div className="mid-box-txt">
          <h1 className="mid-box-txt-title">View your Carbon Impact</h1>
          <p>Find out how your spending habits affect the planet</p>
          <p>and how you can reduce your carbon footprint.</p>
        </div>
      </div>

      <div className="mid-low">
        <div className="mid-low-help">
          <button className="small-help-btn">? Help</button>
        </div>
      </div>
    </div>
  )
}

function Low() {
  return (
    <div className="low-bar">
        <table class="low-bar-tbl">
            <tr>
            <th><button class="low-bar-btn">
                <img src="transactions.png" class="low-bar-btn-img"/>
                <h2 className="low-bar-btn-title">  View Transactions</h2>
                <p className="low-bar-btn-sub">View the individual carbon  impact of each transaction you make.</p>
            </button></th>

            <th><button class="low-bar-btn">
                <img src="goal.png" class="low-bar-btn-img"/>
                <h2 className="low-bar-btn-title">  Carbon Goals</h2>
                <p className="low-bar-btn-sub">Set goals to reduce your carbon impact in different spending categories.</p>
            </button></th>

            <th><button class="low-bar-btn">
                <img src="history.png" class="low-bar-btn-img"/>
                <h2 className="low-bar-btn-title">  Carbon History</h2>
                <p className="low-bar-btn-sub">View your carbon impact over time to find see how you’ve improved.</p>
            </button></th>
            </tr>
        </table>
    </div>
  )
}

function Transactions(){
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to Transaction Page</p>
      <button onClick={CreateRandomAccount}>
        Request for API
      </button>
    </div>
  )
}

export default Transactions;