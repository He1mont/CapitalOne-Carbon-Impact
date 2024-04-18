// Friends.js
import React, { Component, useState } from 'react';
import styles from '../assets/styles/Friends.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { Logo, GoBackBtn, Footer } from './CommonComponents';
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
      message: '',
      isValidInput: true,
      selectionModel: [],
    };
  }
  // initialize and display the friendList
  componentDidMount = async () => {
    const data = await API.getAllFollowings(this.props.userID)
    this.setState({ friendList: data });
  }
  // check if a user is already in the friend list
  isInFriendList = (username) => {
    return this.state.friendList.some(item => item.username === username);
  }

  // add new friend by calling backend API
  addFriend = async () => {
    const currentID = this.props.userID

    if (this.state.newFriend.trim() !== '') {
      const username = this.state.newFriend;
      const data = await API.getAccountByUsername(username)

      // No user found
      if (data.length === 0) {
        this.setState({ isValidInput: false, message: "No user found!" })

      } else {
        const friend = data[0]

        if (friend.accountID === currentID) {       // Search themselves
          this.setState({ isValidInput: false, message: "You cannot search yourself!" })
        } else if (friend.state === "closed") {     // Search for closed accounts
          this.setState({ isValidInput: false, message: "This account has been closed!" })
        } else if (friend.state === "suspended") {  // Search for suspended accounts
          this.setState({ isValidInput: false, message: "This account has been suspended!" })
        } else if (this.isInFriendList(username)) {
          this.setState({ isValidInput: false, message: "You cannot add your friend twice!" })
        } else {
          await API.addFollowing(currentID, friend.accountID)
          this.setState(prevState => ({
            friendList: [...prevState.friendList, friend],
            newFriend: ''
          }));
          this.setState({ isValidInput: true, message: "You've added a new friend!" })
        }
      }
    }
  }
  // remove a friend by calling backend API
  removeFriend = async () => {
    const { selectionModel } = this.state;
    selectionModel.forEach(async (friend) => {
      await API.deleteFollowing(this.props.userID, friend.accountID);
    });
    // update friendList and selectionModel
    this.setState((prevState) => ({
      friendList: prevState.friendList.filter((followingUser) => !prevState.selectionModel.includes(followingUser)),
    }));
    this.setState({ selectionModel: [] });
  };

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

  // call this function when ticking a box
  handleSingleCellClick = (newSelection) => {
    this.setState((prevState) => {
      // check if exist
      const index = prevState.selectionModel.findIndex((item) => item.accountID === newSelection.row.accountID);
      if (index === -1) {
        return {
          selectionModel: [...prevState.selectionModel, newSelection.row],
        };
      } else {
        const updatedSelection = prevState.selectionModel.filter
          ((item) => item.accountID !== newSelection.row.accountID);
        return {
          selectionModel: updatedSelection,
        };
      }
    });
  };

  // call this function when ticking the top column
  handleColumnClick = () => {
    this.setState((prevState) => {
      // check if selectionModel is empty
      if (prevState.selectionModel.length === 0) {
        return {
          // add all friends into selectionModel
          selectionModel: this.state.friendList,
        };
      } else {
        return {
          // set empty
          selectionModel: [],
        };
      }
    });
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
          <div className={this.state.isValidInput ? styles.normalMessage : styles.errorMessage}>
            {this.state.message}
          </div>
          <input
            className={styles.leaderboard_addfriend}
            placeholder="Enter your friend's username"
            value={this.state.newFriend}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button className={styles.button_confirm} onClick={this.addFriend}>
            Confirm
          </button>
          <img src={`/images/bin.png`} className={styles.button_delete}
            onClick={this.removeFriend} />
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
                onCellClick={this.handleSingleCellClick}
                onColumnHeaderClick={this.handleColumnClick}
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
  return (
    <div className={styles.head_bar}>
      <Logo />
      <GoBackBtn name={name} id={id} />
    </div>
  );
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
      <Footer />
    </div>
  )
}

export default Friends;