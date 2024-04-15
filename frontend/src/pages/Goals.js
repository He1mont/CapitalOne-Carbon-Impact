import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Goals.module.css';
import { useHistory,useLocation } from 'react-router-dom';
import * as API from '../services/api';

/**
 * Month selector component
 * Renders a month selector for the user to use to view data from a given month
 */
class MonthSelect extends Component {

    decreaseMonth = () => {
        const { month, onMonthChange } = this.props;
        const nextMonth = month.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        // Only allow month reduction if it goes to a data after the start of 2021
        if (nextMonth.isSameOrAfter(minDate)){
            onMonthChange(nextMonth);
        } 
    };
    increaseMonth = () => {
        const { month, onMonthChange } = this.props;
        const nextMonth = month.clone().add(1, 'month');
        if (nextMonth <= moment()) {
            onMonthChange(nextMonth);
        }
    };

    render() {
        const{month} = this.props;
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
                            <span>{month.format('MMM YYYY')}</span>
                        </th>
                        <th style={{ width: '33%', textAlign: 'left' }}>
                            <button
                                className={styles.month_select_btn}
                                onClick={this.increaseMonth}
                                disabled={month.clone().add(1, 'hour') > moment()}
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
    constructor(props) {
        super(props);
    }

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
        } 
        else {
            percentage = this.getPercentage(this.props.carbonEmission, this.props.goalEmissions);
        }
    
        const diameter = 210;
        const radius = diameter / 2;
        const strokeWidth = 15;
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
                            style={{ transition: 'stroke-dashoffset 1s ease' }} // Added transition
                        />
                    </g>
                </svg>
            </div>
        );
    };

    render() {
        let difference, returnSetence;
        const {goalEmissions, carbonEmission} = this.props;
        if(goalEmissions >= carbonEmission) {
            difference = goalEmissions - carbonEmission;
            returnSetence = "below goal";
        } else {
            difference = carbonEmission - goalEmissions;
            returnSetence = "above goal";
        }

        return (
            <div style={{ position: 'relative', height: '100%' }}>
                
                {/* Render the table containing carbon use circle and mid_circles */}
                <table className={styles.goals_circle_tbl}>
                    <tbody>
                        <tr>
                            <th style={{ width: '33%', textAlign: 'center' }}>
                                <div className={styles.mid_circle_wrapper}>
                                    <div className={styles.mid_circles}>
                                        <div className={styles.mid_circle_txt}>
                                            <h1 className={styles.mid_circle_txt_high}>{this.props.carbonEmission}</h1>
                                            <p className={styles.mid_circle_txt_mid}>kgco2</p>
                                            <p className={styles.mid_circle_txt_low}>score</p>
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
                                                lineHeight: '25px'
                                            }}>
                                            <h1 style={{fontSize: '50px'}}>{this.props.goalEmissions}</h1>
                                            <h2 style={{lineHeight: '0px'}}>kgco2</h2>
                                            <h5 style={{lineHeight: '5px'}}>carbon goal</h5>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th style={{ width: '33%', textAlign: 'center' }}>
                                <div className={styles.mid_circle_wrapper}>
                                    <div className={styles.mid_circles}>
                                        <div className={styles.mid_circle_txt}>
                                            <h1 className={styles.mid_circle_txt_high}>{difference}</h1>
                                            <p className={styles.mid_circle_txt_mid}>kgco2</p>
                                            <p className={styles.mid_circle_txt_low}>{returnSetence}</p>
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

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            newFriend: '',
            carbonScoreList: [],
        };
    }

    // initialize and display the friendList
    async componentDidMount() {
        const id = this.props.userID;
        await API.getAllFollowings(id) 
            .then(data => {
                this.setState({ friendList: data });
            })
            .catch(error => {
                console.error('Error fetching following users:', error);
                this.setState({ friendList: [] });
            });

        this.fetchCarbonScoreForFriends();
    }

    async componentDidUpdate(prevProps, prevState) {
        // Check if the month has changed
        if (prevProps.month.format('MM') !== this.props.month.format('MM')) {
            await this.fetchCarbonScoreForFriends();
        }
    }

    fetchCarbonScoreForFriends = async () => {
        let friends = this.state.friendList;
        const month = this.props.month;
        let carbonScoreList = [];

        await Promise.all(friends.map(async (friend) => {
            const carbonScore = await API.getCarbonScoreByMonth(friend.accountID, 
                month.format('YYYY'), month.format('MM'));
            carbonScoreList.push({ [friend.username]: carbonScore });
        }));

        this.setState({ carbonScoreList });
    };

    render () {
        const followingUsers = this.state.friendList;
        const carbonScoreList = this.state.carbonScoreList;
        const getCarbonScore = (username) => {
            for (const obj of carbonScoreList) {
                if (obj.hasOwnProperty(username)) {
                    return obj[username];
                }
            }
            return null;
        };

        return (
            <div style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                marginTop: '20px',
                minWidth: '700px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div className={styles.leaderboard_container}>
                    Your ID: {this.props.userID}
                </div>
                <div className={styles.leaderboard_container}>
                    {this.state.friendList.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>To view friends, add them by entering their username</p>
                    ) : (
                        <div className={styles.leaderboard_list_container}>
                            <table className={styles.leaderboard_list}>
                                <thead>
                                    <tr>
                                        <th style={{width: '10%', textAlign: 'left'}}> <div>ID</div> </th>
                                        <th style={{width: '50%', textAlign: 'left'}}> <div>Username</div> </th>
                                        <th style={{width: '40%'}}> <div>Carbon Score</div> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followingUsers.map((followingUser, index) => (
                                    <tr key={index} className={styles.leaderboard_tablerow}>
                                        <td style={{width: '10%', textAlign: 'left'}}>{'#' + (index + 1)}</td>
                                        <td style={{width: '50%', textAlign: 'left'}}>{followingUser.username}</td>
                                        <td style={{width: '40%', textAlign: 'center'}}>{getCarbonScore(followingUser.username)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
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
    function handleHomeClick() {
      history.push({
        pathname: '/home',
        state: { name:name, id:id }
      });
      
    }
    return (
        <div className={styles.head_bar}>
            <div className={styles.head_center}>
                <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleHomeClick} />
            </div>
        </div>
    )
}

/**
 * Mid component
 * Renders the middle section of the Goals page, providing contextual information.
 */
function Mid({ name, id, month, onMonthChange }) {
    const [carbonEm, setCarbonEm] = useState(0);
    const [goalEm, setGoalEm] = useState(0);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchCarbonScore = async () => {
          const data = await API.getCarbonScoreByMonth(id, month.format('YYYY'), month.format('MM'));
          setCarbonEm(data);
        };
    
        fetchCarbonScore();
        updateGoal();
      }, [month]);    // recall useEffect when `month` is changed

    async function updateGoal() {
        let ifSet = false; 
        let goals = await API.getUserGoal(id);

        goals.map(goalItem => {
            if (month.format('MMMM') === goalItem.month) {
                setGoalEm(goalItem.goal);
                ifSet = true;
            }
        });
        if(!ifSet) {
            // Didn't set a goal for this month 
            setGoalEm(0);
        }
    };

    async function setGoal(inputGoal) {
        await API.setUserGoal(id, inputGoal, month.format('MMMM'))
            .then(() => {
                setGoalEm(inputGoal);
            })
    };

    const handleGoalInputChange = (event) => {
        if (event.key === 'Enter') {
            let inputGoal = event.target.value;
            if (inputGoal <= 0) {
                inputGoal = 0;
            } else if (inputGoal >= 99999) {
                inputGoal = 99999;
            }
            setGoal(inputGoal)
            setInputValue('');
        }
    };

    return (
        <div className={styles.mid_bar}>
            <div className={styles.mid_high}>
                <div className={styles.mid_high_txt_left}>
                    <p>{name}</p>
                    <h1>Carbon Goals</h1>
                </div>
                <div className={styles.mid_high_center}>
                    <MonthSelect month={month} onMonthChange={onMonthChange} />
                </div>
            </div>
            <div className={styles.mid_center}>
                <CarbonUseCircle carbonEmission={carbonEm} goalEmissions={goalEm} id={id} month={month}/>
            </div>
            <div className={styles.mid_low}>
                <div className={styles.goal_input}>
                    <input 
                    id="goalInput" 
                    placeholder= {'Current Goal: ' + goalEm}
                    onKeyPress={handleGoalInputChange} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles.goal_input_box}/>
                </div>
            </div>
        </div>
    );
}

/**
 * Low component
 * Renders the lower section of the Goals page.
 */
function Low({ id, month }) {
    return (
        <div className={styles.low_bar}>
            <div className={styles.low_body}>
                <Leaderboard userID={id} month={month} />
            </div>
        </div>
    );
}

/**
 * Goals component
 * Main component aggregating Head, Mid, and Low components to form the complete Goals page.
 */
function Goals() {
    const location = useLocation();
    const name = location.state?.name || "You need to login"; 
    const id=location.state?.id ;
    const [month, setMonth] = useState(moment());

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
      };

    return (
      <div>
        <Head name={name} id={id}/>
        <Mid name={name} id={id} month={month} onMonthChange={handleMonthChange}/>
        <Low name={name} id={id} month={month}/>
      </div>
    )  
}

export default Goals;