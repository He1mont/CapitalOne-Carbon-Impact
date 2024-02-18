// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import '../utils/Tools'
import { useHistory ,useLocation} from 'react-router-dom';
import getAllAccounts from '../utils/Tools';

class MonthSelect extends Component {
    state = {
        startMonth: moment(),
        endMonth: moment(),
    };

    decreaseStartMonth = () => {
        const nextMonth = this.state.startMonth.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        if (nextMonth.isSameOrAfter(minDate)) {
            if (nextMonth.isBefore(this.state.endMonth)) {
                this.setState({ startMonth: nextMonth });
            }
        }
    };

    increaseStartMonth = () => {
        const nextMonth = this.state.startMonth.clone().add(1, 'month');
        if (nextMonth.isSameOrBefore(this.state.endMonth)) {
            this.setState({ startMonth: nextMonth });
        }
    };

    decreaseEndMonth = () => {
        const nextMonth = this.state.endMonth.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        if (nextMonth.isSameOrAfter(minDate)) {
            if (nextMonth.isAfter(this.state.startMonth)) {
                this.setState({ endMonth: nextMonth });
            }
        }
    };

    increaseEndMonth = () => {
        const nextMonth = this.state.endMonth.clone().add(1, 'month');
        if (nextMonth.isSameOrAfter(this.state.startMonth)) {
            this.setState({ endMonth: nextMonth });
        }
    };

    render() {
        return (
            <div className={styles.month_range_container}>
                <table className={styles.month_select}>
                    <tbody>
                        <tr>
                            <th style={{ width: '16%', textAlign: 'right' }}>
                                <button className={styles.month_select_btn} onClick={this.decreaseStartMonth}>
                                    <img src="/images/month-range-left.png" alt="Left Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                <span>{this.state.startMonth.format('MMM YYYY')}</span>
                            </th>
                            <th style={{ width: '16%', textAlign: 'left' }}>
                                <button
                                    className={styles.month_select_btn}
                                    onClick={this.increaseStartMonth}
                                    disabled={this.state.startMonth.clone().add(1, 'hour') > moment()}
                                >
                                    <img src="/images/month-range-right.png" alt="Right Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                To
                            </th>
                            <th style={{ width: '16%', textAlign: 'right' }}>
                                <button className={styles.month_select_btn} onClick={this.decreaseEndMonth}>
                                    <img src="/images/month-range-left.png" alt="Left Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                <span>{this.state.endMonth.format('MMM YYYY')}</span>
                            </th>
                            <th style={{ width: '16%', textAlign: 'left' }}>
                                <button
                                    className={styles.month_select_btn}
                                    onClick={this.increaseEndMonth}
                                    disabled={this.state.endMonth.clone().add(1, 'hour') > moment()}
                                >
                                    <img src="/images/month-range-right.png" alt="Right Arrow" width="30px" />
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


/**
 * Head component
 * Renders the header of the History page, including a logo.
 */
function Head({name,id}) {
  const history = useHistory();
  function handleLoginClick() {
    history.push({
      pathname: '/',
      state: { name:name, id:id }
    });
    
  }
  return (
    <div className={styles.head_bar}>
      <div className={styles.head_center}>
        <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleLoginClick}/>
      </div>
    </div>
  )
}

/**
 * Mid component
 * Renders the middle section of the History page, providing contextual information and additional controls.
 */
function Mid({name}) {
  return (
    <div className={styles.mid_bar}>
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>{name}</p>
          <h1>Carbon History</h1>
        </div>
        <div className={styles.mid_high_center_container}>
            <MonthSelect />
        </div>
        <div className={styles.mid_high_profile}>
        </div>
      </div>

      

      <div className={styles.mid_low}></div>
    </div>
  )
}

/**
 * Low component
 * Renders the lower section of the History page, mainly comprising the History table component.
 */
function Low() {
  return (
    <div className={styles.low_bar}>
      
    </div>
  )
}

/**
 * Transactions component
 * Main component aggregating Head, Mid, and Low components to form the complete Transactions page.
 */
function History() {
  const location = useLocation();
  const name = location.state?.name || "You need to login"; 
  const id=location.state?.id ;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name}/>
      <Low />
    </div>
  )
}

export default History;