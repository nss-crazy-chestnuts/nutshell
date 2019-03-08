import React, { Component } from 'react'

class FriendList extends Component {
    render() {
        return (
            <section >
                <h1>Friends</h1>
                <button
                    className="friendAddButton btn btn-primary"
                    onClick={() => {
                        this.props.history.push("/friends/new")
                    }
                    }>Add Friend</button>
                {
                    this.props.expandedFriends
                        .filter(friend => friend.user.id === parseInt(sessionStorage.getItem("credentials")))
                        .map(friend => {
                            return <div className="card" key={friend.id}>
                                {this.props.users.find(user => user.id === friend.friendId).username}
                                <button className="friendButton btn btn-primary" onClick={() => this.props.deleteFriend(friend.id)}>Delete</button>
                            </div>
                        })
                }
                <div className="friendButton friendContainer">
                </div>
            </section>
        )
    }
}

export default FriendList