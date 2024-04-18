import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Goals.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import * as API from '../services/api';
import { Head, Footer } from './CommonComponents';
// table
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

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
        if (nextMonth.isSameOrAfter(minDate)) {
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
        const { month } = this.props;
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
            if (this.props.carbonEmission === 0) {
                color = 'white';
            }
        }

        const diameter = 210;
        const radius = diameter / 2;
        const strokeWidth = 15;
        const viewBoxSize = diameter + strokeWidth;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = ((100 - percentage) * circumference) / 100;

        if (color !== 'white' && this.props.carbonEmission !== 0) {
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
        const { goalEmissions, carbonEmission } = this.props;
        if (goalEmissions >= carbonEmission) {
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
                                            <h1 style={{ fontSize: '50px' }}>{this.props.goalEmissions}</h1>
                                            <h2 style={{ lineHeight: '0px' }}>kgco2</h2>
                                            <h5 style={{ lineHeight: '5px' }}>carbon goal</h5>
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
            carbonGoalList: [],
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

        await this.fetchCarbonScoreForFriends();
        await this.fetchCarbonGoalForFriends();
    }

    async componentDidUpdate(prevProps, prevState) {
        // Check if the month has changed
        if (prevProps.month.format('MM') !== this.props.month.format('MM')) {
            await this.fetchCarbonScoreForFriends();
            await this.fetchCarbonGoalForFriends();
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

    fetchCarbonGoalForFriends = async () => {
        let friends = this.state.friendList;
        const month = this.props.month;
        let carbonGoalList = [];

        await Promise.all(friends.map(async (friend) => {
            const carbonGoal = await API.getUserGoal(friend.accountID);
            // Find the specific month
            for (const goalObj of carbonGoal) {
                if (goalObj.month === month.format('MMMM')) {
                    carbonGoalList.push({ [friend.username]: goalObj.goal });
                    break;
                }
            }
            // User has not set a goal for this month
            carbonGoalList.push({ [friend.username]: 0 });
        }));

        this.setState({ carbonGoalList });
    };

    mergeUsersWithCarbonScore = () => {
        const followingUsers = this.state.friendList;
        const carbonScoreList = this.state.carbonScoreList;
        const carbonGoalList = this.state.carbonGoalList;

        const getForUser = (username, list) => {
            for (const scoreObj of list) {
                if (scoreObj.hasOwnProperty(username)) {
                    return scoreObj[username];
                }
            }
            return null;
        };
    
        const mergedArray = [];
        for (const user of followingUsers) {
            const carbonScore = getForUser(user.username, carbonScoreList);
            const carbonGoal = getForUser(user.username, carbonGoalList);
            let percentage;
            if (carbonGoal === 0) {
                percentage = "NaN";
            } else {
                percentage = (parseInt(carbonScore)/parseInt(carbonGoal)*100).toFixed(2) + '%';
            }

            const mergedObject = { ...user, carbonScore: carbonScore, 
                carbonGoal: carbonGoal, percentage: percentage };
            mergedArray.push(mergedObject);
        }
        return mergedArray;
    };
    

    render() {
        // merge user's goal and score for a specific month with existing info
        const completeFollowingUsers = this.mergeUsersWithCarbonScore();
        // define the top columns for the table
        const columns = [
            //{ field: 'id', headerName: 'Rank', width: 50 },
            { field: 'username', headerName: 'All Following Users', 
                headerClassName: 'super-app-theme--header', width: 250 },
            { field: 'carbonScore', headerName: 'Carbon Score', 
                headerClassName: 'super-app-theme--header', width: 150 },
            { field: 'carbonGoal', headerName: 'Carbon Goal', 
                headerClassName: 'super-app-theme--header', width: 150 },
            { field: 'percentage', headerName: 'Percentage', 
                headerClassName: 'super-app-theme--header', width: 150 },
        ];

    return (
      <div style={{
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        marginTop: '10px',
        minWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div className={styles.leaderboard_container}>
          {this.state.friendList.length === 0 ? (
            <p style={{ textAlign: 'center' }}>To view friends, add them by entering their username</p>
          ) : (
            <div className={styles.leaderboard_list_container}>
                <Box
                    sx={{
                        width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: '#f0f0f0',
                            fontWeight: '800',
                        },
                    }}
                >
                    <DataGrid
                    rows={completeFollowingUsers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
                </Box>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Mid component
 * Renders the middle section of the Goals page, providing contextual information.
 */
function Mid({ name, id, month, onMonthChange }) {
    const [carbonEm, setCarbonEm] = useState(0);
    const [goalEm, setGoalEm] = useState(0);
    const [inputValue, setInputValue] = useState('');

    // recall useEffect when `month` is changed
    useEffect(() => {
        const fetchCarbonScore = async () => {
            const data = await API.getCarbonScoreByMonth(id, month.format('YYYY'), month.format('MM'));
            setCarbonEm(data);
        };

        fetchCarbonScore();
        updateGoal();
    }, [month]);

    async function updateGoal() {
        let ifSet = false;
        let goals = await API.getUserGoal(id);

        goals.map(goalItem => {
            if (month.format('MMMM') === goalItem.month) {
                setGoalEm(goalItem.goal);
                ifSet = true;
            }
        });
        if (!ifSet) {
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

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleSetGoal();
        }
    };

    const handleSetGoal = () => {
        let inputGoal = parseInt(inputValue, 10);
        if (isNaN(inputGoal)) {
            inputGoal = 0;
        } else {
            if (inputGoal <= 0) {
                inputGoal = 0;
            } else if (inputGoal >= 99999) {
                inputGoal = 99999;
            }
        }
        setGoal(inputGoal)
        setInputValue('');
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
                <CarbonUseCircle carbonEmission={carbonEm} goalEmissions={goalEm} id={id} month={month} />
            </div>
            <div className={styles.mid_low}>
                <div className={styles.goal_input}>
                    <input
                        id="goalInput"
                        placeholder={'Please set your new goal'}
                        onKeyPress={handleEnterPress}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.goal_input_box} />
                    <button className={styles.button_confirm} onClick={handleSetGoal}>
                        Confirm
                    </button>
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
    const id = location.state?.id;
    const [month, setMonth] = useState(moment());

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
    };

    return (
        <div>
            <Head name={name} id={id} />
            <Mid name={name} id={id} month={month} onMonthChange={handleMonthChange} />
            <Low name={name} id={id} month={month} />
            {/* <Footer /> */}
        </div>
    )
}

export default Goals;