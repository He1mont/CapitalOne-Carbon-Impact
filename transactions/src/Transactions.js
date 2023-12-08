import React from 'react';
import './Transactions.css';

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
        <img src="transactions-mid-box.png" className="mid-box"/>

      </div>

      <div className="mid-low">

      </div>
    </div>
  )
}

function Low() {
  return (
    <div className="low-bar">
      
    </div>
  )
}

export default function HomePage(){
  return (
    <div>
      <Head />

      <Mid />

      <Low />
    </div>
  )
}
