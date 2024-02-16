import React, { Component, useState } from 'react';
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

class ManageFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        };
        this.dropdownRef = React.createRef();
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

  
    toggleDropdown() {
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    }
    handleOutsideClick(event) {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({
                showDropdown: false
            });
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
    //Create method here to remove friend from list
    handleFriendClick(item) {
        this.props.removeFriend(item);
    }
    
    render() {
        const { list } = this.props;
        return (
            <div className={styles.dropdown} ref={this.dropdownRef}>
                <button onClick={this.toggleDropdown} className={styles.dropbtn}>Manage Friends</button>
                <div id="myDropdown" className={`${styles.dropdownContent} ${this.state.showDropdown ? styles.show : ''}`}>
                    {list.map((item, index) => (
                        <a key={index} onClick={() => this.handleFriendClick(item)}>
                            {item}
                            <img src={`/images/bin.png`} className={styles.dropdown_delete_icon} />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: ['Test1', 'Test2', 'Test3'],
            newFriend: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }

    addFriend() {
        if (this.state.newFriend.trim() !== '') {
            this.setState(prevState => ({
                friendList: [...prevState.friendList, prevState.newFriend],
                newFriend: ''
            }));
        }
    }

    handleChange(event) {
        this.setState({ newFriend: event.target.value });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.addFriend();
        }
    }

    removeFriend(friendName) {
        this.setState(prevState => ({
            friendList: prevState.friendList.filter(friend => friend !== friendName)
        }));
    }

    render () {
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
                    <input
                        className={styles.leaderboard_addfriend}
                        placeholder="Enter your friend's ID"
                        value={this.state.newFriend}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <ManageFriends list={this.state.friendList} removeFriend={this.removeFriend}/>
                </div>
                <div className={styles.leaderboard_container}>
                    {this.state.friendList.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>To view friends, add them by entering their ID</p>
                    ) : (
                        <div className={styles.leaderboard_list_container}>
                            <table className={styles.leaderboard_list}>
                                <tbody>
                                    {this.state.friendList.map((item, index) => (
                                    <tr key={index} className={styles.leaderboard_tablerow}>
                                        <td style={{width: '10%'}}>{'#' + (index + 1)}</td>
                                        <td style={{width: '70%'}}>{item}</td>
                                        <td style={{width: '20%'}}>-xxxxxx-</td>
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
                <CarbonUseCircle carbonEmission='200' goalEmissions='2300' />
            </div>
            <div className={styles.mid_low}></div>
        </div>
    );
}

/**
 * Low component
 * Renders the lower section of the Goals page.
 */
function Low({name, id}) {
    return (
        <div className={styles.low_bar}>
            <Leaderboard userID={id}/>
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
        <Low name={name} id={id}/>
      </div>
    )  
}

export default Goals;