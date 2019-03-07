import React, { Component } from 'react'

class FriendList extends Component {
    render() {
        return (
            <section className="friends">
                <h1>Friends</h1>
                <button
                    className="friendAddButton"
                    onClick={() => {
                        this.props.history.push("/friends/new")
                    }
                    }>Add Friend</button>
                {
                    this.props.expandedFriends
                        .filter(friend => friend.user.id === parseInt(sessionStorage.getItem("credentials")))
                        .map(friend => {
                            return <div key={friend.id}>
                                {this.props.users.find(user => user.id === friend.friendId).username}
                                <button onClick={() => this.props.deleteFriend(friend.id)}>Delete</button>
                            </div>
                        })
                }
                <div className="friendContainer">
                </div>
            </section>
        )
    }
}

export default FriendList