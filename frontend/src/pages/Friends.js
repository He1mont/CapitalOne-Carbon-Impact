// Friends.js
import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/styles/Friends.module.css';     // CSS module
import { Logo, GoBackBtn, Footer } from './CommonComponents'; // Reusable components
import * as API from '../services/api';       // API functions for server-side interactions
import { DataGrid } from '@mui/x-data-grid';  // Material-UI component
import Box from '@mui/material/Box';

/**
 * Leaderboard component that manages and displays a list of friends following the user.
 * It supports adding, removing, and listing friends using backend API calls.
 */
class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],     // list of friends following the user
      newFriend: '',      // input username for adding a new friend
      message: '',        // feedback message for the user
      isValidInput: true, // validity of the input
      selectionModel: [], // selected items in the grid
    };
  }
  // Fetches the list of all following users once the component mounts.
  componentDidMount = async () => {
    const data = await API.getAllFollowings(this.props.userID)
    this.setState({ friendList: data });
  }

  // Checks if a username is already in the friend list.
  isInFriendList = (username) => {
    return this.state.friendList.some(item => item.username === username);
  }

  // Add new friend by calling backend API
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

  // Remove a friend by calling backend API
  removeFriend = async () => {
    const { selectionModel } = this.state;
    selectionModel.forEach(async (friend) => {
      await API.deleteFollowing(this.props.userID, friend.accountID);
    });
    // Update friendList and selectionModel
    this.setState((prevState) => ({
      friendList: prevState.friendList.filter((followingUser) => !prevState.selectionModel.includes(followingUser)),
    }));
    this.setState({ selectionModel: [] });
  };

  // Handles text input changes.
  handleChange = (event) => {
    this.setState({ newFriend: event.target.value });
  }

  // Allows submitting new friend addition on pressing 'Enter'.
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addFriend();
    }
  }

  // Handles row selection in the data grid.
  handleSingleCellClick = (newSelection) => {
    this.setState((prevState) => {
      // Check if exists
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

  // Handles column header click to select or deselect all rows.
  handleColumnClick = () => {
    this.setState((prevState) => {
      // Check if selectionModel is empty
      if (prevState.selectionModel.length === 0) {
        return {
          // Add all friends into selectionModel
          selectionModel: this.state.friendList,
        };
      } else {
        return {
          selectionModel: [],   // Set empty
        };
      }
    });
  }

  render() {
    const followingUsers = this.state.friendList;
    const columns = [
      {
        field: 'username', width: 200,
        description: 'The username of the user you are following.',
        renderHeader: () => (
          <strong>{'Following Users'}</strong>
        )
      },
      {
        field: 'email', width: 300,
        renderHeader: () => (
          <strong>{'Email'}</strong>
        )
      },
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
          {/* Feedback message display based on input validation */}
          <div className={this.state.isValidInput ? styles.normalMessage : styles.errorMessage}>
            {this.state.message}
          </div>
          {/* Input field for adding a new friend */}
          <input
            className={styles.leaderboard_addfriend}
            placeholder="Enter your friend's username"
            value={this.state.newFriend}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          {/* Button to confirm adding a new friend */}
          <button className={styles.button_confirm} onClick={this.addFriend}>
            Confirm
          </button>
          {/* Button to remove a friend */}
          <img src={`/images/bin.png`} className={styles.button_delete}
            alt="Delete Button"
            onClick={this.removeFriend} />
        </div>
        {/* Leaderboard */}
        <div className={styles.leaderboard_container}>
          {this.state.friendList.length === 0 ? (
            <p style={{ textAlign: 'center' }}>To view friends, add them by entering their username</p>
          ) : (
            <div className={styles.leaderboard_list_container}>
              <Box
                sx={{
                  width: '100%',
                }}
              >
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
              </Box>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Head component for the Friends page displaying the logo and a go back button.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
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
 * Mid component for rendering the main section of the Friends page.
 * It includes the leaderboard of friends and user information.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Mid({ name, id }) {
  return (
    <div className={styles.mid_body}>
      {/* User Information and Friend Overview */}
      <div className={styles.mid_high} />
      <div className={styles.mid_low} />
      <div className={styles.mid_center}>
        <div className={styles.mid_body_padding}>
          <div className={styles.title_text}> <b>My Friends</b></div>
          <Leaderboard userID={id} />
        </div>
      </div>
    </div>
  )
}

/**
 * Friends component that aggregates all sub-components
 * It manages the overall layout and state passing to sub-components.
 */
function Friends() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} />
      <Footer />
    </div>
  )
}

export default Friends;