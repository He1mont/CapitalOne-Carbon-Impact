import React from 'react';
import './App.css';


function TransactionTbl() {
  return(
    <div>
      <div className="transaction-btns">
        <input className='transaction-btns-search' placeholder='Search'></input>
        <button className='transaction-btns-filter'>Filter</button>
      </div>
      <div className="transaction-tbl-container">
        <table className='transaction-tbl'>
          <tr>
            <th className='c'>Date</th>
            <th className='l'>Description</th>
            <th className='l'>Category</th>
            <th className='r'>Carbon Impact (kgco2)</th>
            <th className='r'>Cost</th>
          </tr>
          <tr>
            <td className='c'>1</td>
            <td className='l'>2</td>
            <td className='l'>3</td>
            <td className='r'>4</td>
            <td className='r'>5</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

function Head() {
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src='CapitaloneLogo.png' className="head-img"/>
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
        <div className="mid-high-center">
          <table className="month-select">
            <tr>
              <th>  
                <button className="month-select-btn">O</button>
              </th>
              <th>-  Month  -</th>
              <th>  
                <button className="month-select-btn">O</button>
              </th>
            </tr>
          </table>
        </div>
        <div className="mid-high-profile">

        </div>
      </div>

      <div className="mid-center">
        <img src="transactions-mid-box.png" className="mid-box"/>
        <div className="mid-box-txt">
          <p>1000</p>
          <p>kgco2</p>
          <p>estimate</p>
        </div>
      </div>

      <div className="mid-low"></div>
    </div>
  )
}

function Low() {
  return (
    <div className="low-bar">
      <TransactionTbl />
    </div>
  )
}

function Transactions(){
  return (
    /*<div>
      <h1>Hello, World!</h1>
      <p>Welcome to Transaction Page</p>
      <button onClick={CreateRandomAccount}>
        Request for API
      </button>
    </div>*/
    <div>
      <Head />
      <Mid />
      <Low />
    </div>
  )
}

export default Transactions;