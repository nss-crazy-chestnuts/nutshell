import React, { Component } from "react";
import UserManager from "../../modules/UserManager";

export default class FriendAddForm extends Component {
    // Set initial state
    state = {
        username: "",
        friendId: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange.username = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewFriend = evt => {
        evt.preventDefault();

        UserManager.getAll()
        .then(users => {
            const friendId = users.find(currentUser => currentUser.username === this.state.username)
            if (this.state.username === "") {
                window.alert("Please enter a user");
            } else if (this.state.username === this.props.activeUser.username) {
                window.alert("Can't friend yourself")
            } else if (friendId !== undefined && this.props.expandedFriends.filter(currentFriend => currentFriend.userId === parseInt(sessionStorage.getItem("credentials"))).filter(currentFriend => currentFriend.friendId === friendId.id).length > 0) {
                window.alert("You are already friends with this user")
            }else {
                if (friendId !== undefined) {
                    const friendObject = {
                        userId: this.props.activeUser.id,
                        friendId: friendId.id
                    }
                    this.props
                        .addFriend(friendObject)
                        .then(() => this.props.history.push("/friends"));
                } else {
                    window.alert("Username not found");
                }
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <form className="friendForm">
                    <div className="form-group">
                        <label htmlFor="username">Enter a friend's username:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="username"
                            placeholder="Username"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewFriend}
                        className="friendSaveAddButton"
                    >
                        Add Friend
          </button>
                </form>
            </React.Fragment>
        );
    }
}