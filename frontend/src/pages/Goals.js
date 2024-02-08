import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Goals.module.css';
import { useHistory,useLocation } from 'react-router-dom';

/**
 * Month selector component
 * Renders a month selector for the user to use to view data from a given month
 */
class MonthSelect extends Component {
    state = {
        month: moment(),
    };
    decreaseMonth = () => {
        const nextMonth = this.state.month.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        if (nextMonth.isSameOrAfter(minDate)){ //Only allow month reduction if it goes to a data after the start of 2021
            this.setState(
                (prevState) => ({ month: prevState.month.clone().subtract(1, 'month') })
            );
        } 
    };
    increaseMonth = () => {
        const nextMonth = this.state.month.clone().add(1, 'month');
        if (nextMonth > moment()) {
            return; // Do nothing if attempting to go to a future month
        }
        this.setState(
            (prevState) => ({ month: nextMonth })
        );
    };

    render() {
        return (
            <table className={styles.month_select}>
                <tbody>
                    <tr>
                        <th style={{ width: '33%', textAlign: 'right' }}>
                            <button className={styles.month_select_btn} onClick={this.decreaseMonth}>
                                <img src="/images/month-left.png" alt="Left Arrow" width="30px" />
                            </button>
                        </th>
                        <th style={{ width: '34%', textAlign: 'center' }}>
                            <span>{this.state.month.format('MMM YYYY')}</span>
                        </th>
                        <th style={{ width: '33%', textAlign: 'left' }}>
                            <button
                                className={styles.month_select_btn}
                                onClick={this.increaseMonth}
                                disabled={this.state.month.clone().add(1, 'hour') > moment()}
                            >
                                <img src="/images/month-right.png" alt="Right Arrow" width="30px" />
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class CarbonUseCircle extends Component {
    getPercentage = (carbonEmission, goalEmissions) => {
        let percentage = carbonEmission / goalEmissions;
        if (percentage > 1) {
            percentage = 1;
        }
        return percentage * 100;
    };

    drawCircle = ({ color }) => {
        let percentage = 0;

        if (color === 'white') {
            percentage = 100;
        } else {
            percentage = this.getPercentage(this.props.carbonEmission, this.props.goalEmissions);
        }

        const diameter = 350;
        const radius = diameter / 2;
        const strokeWidth = 20;
        const viewBoxSize = diameter + strokeWidth;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = ((100 - percentage) * circumference) / 100;

        if (color !== 'white') {
            const hue = ((100 - percentage) / 100) * 120;
            color = `hsl(${hue}, 100%, 50%)`;
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <svg height={diameter} width={diameter} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                    <g transform={`rotate(90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}>
                        <circle
                            r={radius - strokeWidth / 2}
                            cx={radius + strokeWidth / 2}
                            cy={radius + strokeWidth / 2}
                            fill="transparent"
                            stroke={strokeDashoffset !== circumference ? color : ''}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={percentage ? strokeDashoffset : 0}
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
        );
    };

    render() {
        return (
            <div style={{ position: 'relative', height: '100%' }}>
                
                {/* Render the table containing carbon use circle and mid_circles */}
                <table style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', minWidth: '1000px'}}>
                    <tbody>
                        <tr>
                            <th style={{ width: '33%', textAlign: 'center' }}>
                                <div className={styles.mid_circle_wrapper}>
                                    <div className={styles.mid_circles}>
                                        <div style={{
                                                position: 'absolute',
                                                top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center',
                                                color: 'white',
                                                lineHeight: '6px',
                                                fontSize: '18px'
                                            }}>
                                            <h1>#holder#</h1>
                                            <p>kgco2</p>
                                            <p>last month</p>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th style={{ width: '34%', textAlign: 'center' }}>
                                <img src="/images/goals-mid.png" alt="arctic container" className={styles.img_box} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                        {this.drawCircle({ color: 'white' })}
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                            {this.drawCircle({ color: 'red' })}
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center',
                                                color: 'white',
                                                lineHeight: '10px'
                                            }}>
                                            <h1>{this.props.carbonEmission}</h1>
                                            <h2>kgco2</h2>
                                            <h5>estimate</h5>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th style={{ width: '33%', textAlign: 'center' }}>
                                <div className={styles.mid_circle_wrapper}>
                                    <div className={styles.mid_circles}>
                                        <div style={{
                                                position: 'absolute',
                                                top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center',
                                                color: 'white',
                                                lineHeight: '6px',
                                                fontSize: '18px'
                                            }}>
                                            <h1>{this.props.goalEmissions - this.props.carbonEmission}</h1>
                                            <p>kgco2</p>
                                            <p>below goal</p>
                                        </div>
                                    </div>
                                </div>
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
 * Renders the header of the Goals page, including a logo.
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
                <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleLoginClick} />
            </div>
        </div>
    )
}

/**
 * Mid component
 * Renders the middle section of the Goals page, providing contextual information.
 */
function Mid({name,id}) {
    return (
        <div className={styles.mid_bar}>
            {/* User Information and Goal Overview */}
            <div className={styles.mid_high}>
                <div className={styles.mid_high_txt_left}>
                    <p>{name}</p>
                    <h1>Carbon Goals</h1>
                </div>
                <div className={styles.mid_high_center}>
                    <MonthSelect />
                </div>
                <div className={styles.mid_high_profile}></div>
            </div>

            {/* Render CarbonUseCircle component */}
            <div className={styles.mid_center}>
                <CarbonUseCircle carbonEmission='1600' goalEmissions='2000' />
            </div>
            <div className={styles.mid_low}></div>
        </div>
    );
}

/**
 * Low component
 * Renders the lower section of the Goals page.
 */
function Low() {
    return (
        <div className={styles.low_bar}>

        </div>
    )
}

/**
 * Goals component
 * Main component aggregating Head, Mid, and Low components to form the complete Goals page.
 */
function Goals() {
    const location = useLocation();
    const name = location.state?.name || "You need to login"; 
    const id=location.state?.id ;
    return (
      <div>
        <Head name={name} id={id}/>
        <Mid name={name} id={id}/>
        <Low />
      </div>
    )  
}

export default Goals;