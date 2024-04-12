// MyFriends.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/MyFriends.css';

function Head() {
    const history = useHistory();

    function handleBackClick(){
        history.push('/HomePage');
    }

    return(
        <div className={styles.head_bar}>
          {/* Logo */}
          <div className={styles.head_center}>
            <img src="/images/Logo.png" className={styles.head_img} alt="Logo" />
          </div>
 
          {/* Back */}
          <div className={styles.head_back_container}>
            <button onClick={handleBackClick} className={styles.back_btn}>
              <img src="/images/back.png" alt="Back" className={styles.back_img}/>
            </button>
          </div>

        </div>
    );
}


function Mid(){
    return(
        <div className={styles.mid-bar}>

          {/* My Friends */}
        <div className={styles.mid_high}>
          <div className={styles.mid-high-txt-left}>
            <h1>My Friends</h1>
          </div>
        </div>
        </div>
    );
}

function Low({friendsList}){
    // State to manage the list of friends
    const [localFriendList, setLocalFriendList] = useState(friendList || []);

    // Function to remove a friend from the list
    const removeFriend = (friendName) => {
        setLocalFriendList(localFriendList.filter(friend => friend !== friendName));
    };

    return(
        <div className={styles.low_bar}>
          {/* Render the list of friends */}
          {localFriendList.map((friend, index) => (
           <div key={index} className={styles.friend}>
            <span className="name">{friend}</span>
             <button className="action-btn" onClick={() => removeFriend(friend)}>
               Remove
             </button>
           </div>
      ))}
        </div>
    );
}

/**
 * Footer component
 * Displays the footer of the homepage, including copyright information.
 */
function Footer() {
    return (
      <div className="footer">
        <p>© 2023-2024 Team7. All rights reserved.</p>
      </div>
    );
  }
  /**
   * HomePage component
   * Composes the Head, Mid, Low, and Footer components to form the homepage.
   */
  function MyFriends() {
    return (
      <div>
        <Head />
        <Mid />
        <Low />
        <Footer />
      </div>
    );
  }
  
  export default MyFriends;