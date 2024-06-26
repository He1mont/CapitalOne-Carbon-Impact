// Goal.js
import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/styles/Goals.module.css';                   // CSS modules
import { Logo, GoBackBtn, SettingBtn, Footer } from './CommonComponents'; // Reused Components
import * as API from '../services/api'; // API functions for server-side interactions
import moment from 'moment';            // External libraries
import clsx from 'clsx';
import Box from '@mui/material/Box';    // MUI Components
import { DataGrid } from '@mui/x-data-grid';

/**
 * Month selector component:
 * Renders a month selector for the user to use to view data from a given month.
 */
class MonthSelect extends Component {
  // Decreases the selected month by one
  decreaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    // Only allow month reduction if it goes to a data after the start of 2021
    if (nextMonth.isSameOrAfter(minDate)) {
      onMonthChange(nextMonth);
    }
  };

  // Increases the selected month by one.
  increaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().add(1, 'month');
    // Only allows the month to be increased if it's not beyond the current month.
    if (nextMonth <= moment()) {
      onMonthChange(nextMonth);
    }
  };

  // Renders the month selector table.
  render() {
    const { month } = this.props;
    return (
      <table className={styles.month_select}>
        <tbody>
          <tr>
            {/* Button to decrease the month with an image of a left arrow */}
            <th style={{ width: '33%', textAlign: 'right' }}>
              <button className={styles.month_select_btn} onClick={this.decreaseMonth}>
                <img src="/images/month-left.png" alt="Left Arrow" width="30px" />
              </button>
            </th>
            {/* Displays the currently selected month in 'MMM YYYY' format */}
            <th style={{ width: '34%', textAlign: 'center' }}>
              <span>{month.format('MMM YYYY')}</span>
            </th>
            {/* Button to increase the month with an image of a right arrow */}
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

/**
 * Carbon use component:
 * constructs a comparison chart of the month in carbon against the goal.
 */
class CarbonUseCircle extends Component {

  // Calculates the percentage of carbon emission compared to the goal emissions.
  getPercentage = (carbonEmission, goalEmissions) => {
    let percentage = carbonEmission / goalEmissions;
    if (percentage > 1) {
      percentage = 1;
    }
    return percentage * 100;
  };

  // Generates SVG markup to render a circular progress chart.
  drawCircle = ({ color }) => {
    let percentage = 0;

    // Adjust color and completion percentage based on current emissions
    if (color === 'white') {
      percentage = 100;   // Set full circle if specified color is white
    } else {
      percentage = this.getPercentage(this.props.carbonEmission, this.props.goalEmissions);
      if (this.props.carbonEmission === 0) {
        color = 'white';  // Set circle color to white if no emissions
      }
    }

    const diameter = 210;
    const radius = diameter / 2;
    const strokeWidth = 15;
    const viewBoxSize = diameter + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = ((100 - percentage) * circumference) / 100;

    // Update color based on percentage to visualize emission severity
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

    // Calculate the difference between the goal and actual emissions
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

        {/* Table layout to organize the display of carbon data visually */}
        <table className={styles.goals_circle_tbl}>
          <tbody>
            <tr>
              {/* Display current carbon emission score */}
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
              {/* Visual representation of the carbon goal */}
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
              {/* Display the difference in emissions relative to the goal */}
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

  // Initializes and displays the friend list and fetches carbon scores for friends.
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

  // Fetches carbon scores for friends when the month changes.
  async componentDidUpdate(prevProps, prevState) {
    // Check if the month has changed
    if (prevProps.month.format('MM') !== this.props.month.format('MM')) {
      await this.fetchCarbonScoreForFriends();
      await this.fetchCarbonGoalForFriends();
    }
  }

  // Fetches and stores carbon scores for all friends for the current month.
  fetchCarbonScoreForFriends = async () => {
    let friends = this.state.friendList;
    const month = this.props.month;
    let carbonScoreList = [];

    await Promise.all(friends.map(async (friend) => {
      const carbonScore = await API.getCarbonScoreByMonth(friend.accountID,
        month.year(), month.month());
      carbonScoreList.push({ username: friend.username, carbonScore: carbonScore });
    }));

    // Sort by carbon score in ascending order
    carbonScoreList.sort((friend1, friend2) => friend1.carbonScore - friend2.carbonScore);
    this.setState({ carbonScoreList });
  };

  // Fetches and stores carbon goals for all friends.
  fetchCarbonGoalForFriends = async () => {
    let friends = this.state.friendList;
    const month = this.props.month;
    let carbonGoalList = [];

    await Promise.all(friends.map(async (friend) => {
      const carbonGoal = await API.getUserGoal(friend.accountID);
      // Find the specific month
      for (const goalObj of carbonGoal) {
        if (goalObj.month === month.format('MMMM') &&
          goalObj.year === month.format('YYYY')) {
          carbonGoalList.push({ username: friend.username, carbonGoal: goalObj.goal });
          break;
        }
      }
      // User has not set a goal for this month
      carbonGoalList.push({ username: friend.username, carbonGoal: 0 });
    }));

    this.setState({ carbonGoalList });
  };

  // Merges carbon score and goal data for display.
  mergeUsersforDisplay = () => {
    // Helper to retrieve a friend's details by username.
    const getUser = (username) => {
      for (const item of this.state.friendList) {
        if (item.username === username) {
          return item;
        }
      }
      return null;
    };
    // Helper to retrieve a friend's carbon goal by username.
    const getForUser = (username) => {
      for (const item of this.state.carbonGoalList) {
        if (item.username === username) {
          return item.carbonGoal;
        }
      }
      return null;
    };

    let rank = 1;
    const mergedArray = [];
    // Merge data for each user in the carbon score list.
    for (const userItem of this.state.carbonScoreList) {
      const friend = getUser(userItem.username);
      const carbonGoal = getForUser(userItem.username);
      const status = carbonGoal - userItem.carbonScore;
      const mergedObject = {
        ...friend, rank: rank, carbonScore: userItem.carbonScore,
        carbonGoal: carbonGoal, status: status
      };
      mergedArray.push(mergedObject);
      rank += 1;
    }
    return mergedArray;
  };

  render() {
    // Merge user data with their goals and scores to display in the DataGrid.
    const completeFollowingUsers = this.mergeUsersforDisplay();

    // / Define the columns for the DataGrid, including custom header styles and alignment properties.
    const columns = [
      {
        field: 'rank', width: 70, headerClassName: 'header-theme',
        renderHeader: () => (<strong>{'Rank'}</strong>)
      },
      {
        field: 'username', width: 180, headerClassName: 'header-theme',
        renderHeader: () => (<strong>{'Following Users'}</strong>)
      },
      {
        field: 'carbonScore', width: 170, headerClassName: 'header-theme',
        align: 'center', headerAlign: 'center',
        renderHeader: () => (<strong>{'Carbon Score'}</strong>)
      },
      {
        field: 'carbonGoal', width: 170, headerClassName: 'header-theme',
        align: 'center', headerAlign: 'center',
        renderHeader: () => (<strong>{'Carbon Goal'}</strong>)
      },
      {
        field: 'status', width: 170, headerClassName: 'header-theme',
        align: 'center', headerAlign: 'center',
        // Apply conditional styling based on the status value.
        cellClassName: (params) => {
          if (params.value == null) {
            return '';
          }
          return clsx('super-app', {
            negative: params.value < 0,   // Style for negative status.
            positive: params.value >= 0,  // Style for positive or neutral status.
          });
        },
        renderHeader: () => (<strong>{'Status'}</strong>)
      },
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
            <p style={{ textAlign: 'center' }}>To view friends, add then through settings</p>
          ) : (
            <div className={styles.leaderboard_list_container}>
              <Box
                sx={{
                  width: 762,
                  '& .header-theme': {
                    backgroundColor: '#f0f0f0',
                  },
                  '& .super-app.negative': {
                    backgroundColor: '#eaaeb5',
                    color: '#1a3e72',
                    fontWeight: '600',
                  },
                  '& .super-app.positive': {
                    backgroundColor: '#c4f1b6',
                    color: '#1a3e72',
                    fontWeight: '600',
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
 * Head component:
 * Displays the top part including the logo and GoBack button and a Setting button.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Head({ name, id }) {
  return (
    <div className={styles.head_bar}>
      <Logo />
      <GoBackBtn name={name} id={id} />
      <SettingBtn name={name} id={id} />
    </div>
  );
}

/**
 * Mid component:
 * Renders the middle section of the Goals page, providing contextual information.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 * @param {object} month - Currently selected month object, typically a moment.js object.
 * @param {function} onMonthChange - Callback function to handle changes to the selected month.
 */
function Mid({ name, id, month, onMonthChange }) {
  const [carbonEm, setCarbonEm] = useState(0);
  const [goalEm, setGoalEm] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Recall useEffect when `month` is changed
  useEffect(() => {
    // Fetch the total carbon score of the given month from backend API
    const fetchCarbonScore = async () => {
      const data = await API.getCarbonScoreByMonth(id, month.year(), month.month());
      setCarbonEm(data);
    };

    // Updates the goal emission for the current month.
    const updateGoal = async () => {
      let ifSet = false;
      let goals = await API.getUserGoal(id);

      goals.forEach(goalItem => {
        if ((month.format('YYYY') === goalItem.year) &&
          (month.format('MMMM') === goalItem.month)) {
          setGoalEm(goalItem.goal);
          ifSet = true;
        }
      });
      if (!ifSet) {
        setGoalEm(0);   // Didn't set a goal for this month 
      }
    };

    fetchCarbonScore();
    updateGoal();
  }, [month, id]);

  // Sets the goal emission for the current month.
  const setGoal = async (inputGoal) => {
    await API.setUserGoal(id, parseInt(inputGoal), month.format('YYYY'), month.format('MMMM'));
    setGoalEm(inputGoal);
  };

  // Handles keyboard input to trigger setting a new goal when the Enter key is pressed.
  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleSetGoal();
    }
  };

  // Validates and sets a new goal based on the user input from the input field.
  const handleSetGoal = () => {
    let inputGoal = parseInt(inputValue, 10);
    // Validate input goal value to ensure it is within allowed range.
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
      {/* Displays user's name and a header for the Carbon Goals section. */}
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>{name}</p>
          <h1>Carbon Goals</h1>
        </div>
        <div className={styles.mid_high_center}>
          <MonthSelect month={month} onMonthChange={onMonthChange} />
        </div>
      </div>

      {/* Visualization of the current carbon emissions compared to the goals. */}
      <div className={styles.mid_center}>
        <CarbonUseCircle carbonEmission={carbonEm} goalEmissions={goalEm} id={id} month={month} />
      </div>

      {/* Input field and button for setting new carbon goals. */}
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
 * Low component:
 * Renders the lower section of the Goals page.
 * @param {string} id - AccountID of the user.
 * @param {object} month - Currently selected month object, typically a moment.js object.
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
 * Goals component:
 * Main component aggregating Head, Mid, and Low components to form the complete Goals page.
 */
function Goals() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  const [month, setMonth] = useState(moment());

  // Handles month change.
  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} month={month} onMonthChange={handleMonthChange} />
      <Low name={name} id={id} month={month} />
      <Footer />
    </div>
  )
}

export default Goals;