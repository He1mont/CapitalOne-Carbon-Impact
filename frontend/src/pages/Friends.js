// Friends.js
import React, { Component } from 'react';
import styles from '../assets/styles/Friends.module.css';
import { useHistory, useLocation } from 'react-router-dom';
// helper functions
import * as API from '../services/api';
// table
import { DataGrid } from '@mui/x-data-grid';


class ManageFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        };
        this.dropdownRef = React.createRef();
    }
    toggleDropdown = () => {
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    };
    handleOutsideClick = (event) => {
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
    handleDeleteFriendClick(item) {
        this.props.removeFriend(item);
    }

    render() {
        const { list } = this.props;
        return (
            <div className={styles.dropdown} ref={this.dropdownRef}>
                <button onClick={this.toggleDropdown} className={styles.dropbtn}>Manage Friends</button>
                <div id="myDropdown" className={`${styles.dropdownContent} ${this.state.showDropdown ? styles.show : ''}`}>
                    {list.map((item, index) => (
                        <a key={index} >
                            {item.username}
                            <img src={`/images/bin.png`} className={styles.dropdown_delete_icon}
                                onClick={() => this.handleDeleteFriendClick(item)} />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

/**
 * FollowingTbl component
 * Renders a table displaying all following users.
 */
class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            newFriend: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }
    // initialize and display the friendList
    componentDidMount = async() => {
        const data = await API.getAllFollowings(this.props.userID)
        this.setState({ friendList: data });
    }
    // add new friend by calling backend API
    addFriend = async() => {
        const currentID = this.props.userID

        if (this.state.newFriend.trim() !== '') {
            const username = this.state.newFriend;
            let friend = await API.getAccountByUsername(username)

            // Check if the input is invalid
            if (friend === null) {

                // Search for themselves
            } else if (friend.accountID === currentID) {

                // Search for closed accounts
            } else if (friend.state === "closed") {

                // Search for suspended accounts
            } else if (friend.state === "suspended") {

                // Add the following relation
            } else {
                await API.addFollowing(currentID, friend.accountID)
                this.setState(prevState => ({
                    friendList: [...prevState.friendList, friend],
                    newFriend: ''
                }));
            }
        }
    }
    // remove a friend by calling backend API
    removeFriend = async(friend) => {
        await API.deleteFollowing(this.props.userID, friend.accountID);
        this.setState(prevState => ({
            friendList: prevState.friendList.filter(followingUser => followingUser !== friend)
        }));
    }
    // update search frame
    handleChange = (event) => {
        this.setState({ newFriend: event.target.value });
    }

    // link button confirm to key press 'Enter'
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addFriend();
        }
    }
    render() {
        const followingUsers = this.state.friendList;
        const columns = [
            { field: 'username', headerName: 'All Following Users', width: 350 },
          ];

        return (
            <div style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                minWidth: '700px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div className={styles.leaderboard_container}>
                    <input
                        className={styles.leaderboard_addfriend}
                        placeholder="Enter your friend's username"
                        value={this.state.newFriend}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <button className={styles._dropbtn} onClick={this.addFriend}>
                        Confirm
                    </button>
                </div>
                <div className={styles.leaderboard_container}>
                    {this.state.friendList.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>To view friends, add them by entering their username</p>
                    ) : (
                        <div className={styles.leaderboard_list_container}>
                            <DataGrid
                                rows={followingUsers}
                                columns={columns}
                                initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

/**
 * Head component
 * Renders the header of the Friend page, including a logo.
 */
function Head({ name, id }) {
    const history = useHistory();
    function handleHomeClick() {
        history.push({
            pathname: '/home',
            state: { name: name, id: id }
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
 * Renders the middle section of the Friend page.
 */
function Mid({ name }) {

    return (
        <div className={styles.mid_bar}>
            {/* User Information and Friend Overview */}
            <div className={styles.mid_high}>
                <div className={styles.mid_high_txt_left}>
                    <p>{name}</p>
                    <h1>View Friends</h1>
                </div>
            </div>
        </div>
    )
}

/**
 * Low component
 * Renders the lower section of the Friends page, mainly comprising the LeaderBoard component.
 */
function Low({ id }) {

    return (
        <div className={styles.low_bar}>
            <div className={styles.low_body}>
                <Leaderboard userID={id} />
            </div>
        </div>
    );
}

/**
 * Friends component
 * Main component aggregating Head, Mid, and Low components to form the complete Friends page.
 */
function Friends() {
    const location = useLocation();
    const name = location.state?.name || "You need to login";
    const id = location.state?.id;

    return (
        <div>
            <Head name={name} id={id} />
            <Mid name={name} />
            <Low id={id} />
        </div>
    )
}

export default Friends;