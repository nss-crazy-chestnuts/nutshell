import React, { Component } from 'react'


class ChatList extends Component {

    timeConverter(timestamp) {
        let a = new Date(parseInt(timestamp))
        let timestring = String(a).split(" ")
        let time = timestring.slice(0, 5).reduce((currentEl, nextEl) => `${currentEl} ${nextEl}`)
        return time
    }

    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight)
    }

    render() {
        return (
            <section className="chats">
                <h1>Chats</h1>
                <button
                    className="chatAddButton btn btn-primary"
                    onClick={() => {
                        this.props.history.push("/chat/new")
                    }
                    }>Add Chat
                            </button>
                {
                    this.props.chats.sort(function (a, b) { return a.timestamp - b.timestamp })
                        .map(currentChat => {
                            return (
                                <div key={currentChat.id} className="card">
                                    <p className="chatMessageMainText">{currentChat.messageText}</p>
                                    <p className="chatMessageSubext">Posted by: <strong>{
                                        this.props.users.find(user => user.id === currentChat.userId).username
                                    }</strong> on {this.timeConverter(currentChat.timestamp)}</p>
                                    {
                                        (currentChat.userId === this.props.activeUser.id) ? (
                                            <button type="button" className="chatButton btn btn-primary"
                                                onClick={() => {
                                                    this.props.history.push(`/chat/${currentChat.id}/edit`);
                                                }}>Edit</button>) : ("")
                                    }
                                </div>
                            )
                        })
                }
            </section>
        )
    }
}

export default ChatList