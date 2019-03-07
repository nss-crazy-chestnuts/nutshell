import React, { Component } from "react"
import ChatManager from "../../modules/ChatManager"

export default class ChatEditForm extends Component {
    // Set initial state
    state = {
        messageText: "",
        userId: "",
        timestamp: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingChat = evt => {
        evt.preventDefault()

        if (this.state.messageText === "") {
            window.alert("Please enter a message");
        } else {
            const editedChat = {
                id: this.props.match.params.chatId,
                messageText: this.state.messageText,
                timestamp: this.state.timestamp,
                userId: this.state.userId
            };
            this.props.updateChat(editedChat)
                .then(() => this.props.history.push("/chat"))
        }
    }

    componentDidMount() {
        ChatManager.get(this.props.match.params.chatId)
            .then(chat => {
                this.setState({
                    messageText: chat.messageText,
                    timestamp: chat.timestamp,
                    userId: chat.userId
                });
            });
    }


    render() {
        return (
            <React.Fragment>
                <form className="chatForm">
                    <div className="form-group">
                        <label htmlFor="messageText">Message:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="messageText"
                            value={this.state.messageText}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.updateExistingChat}
                        className="chatSaveEditButton"
                    >
                        Submit
            </button>
                </form>
            </React.Fragment>
        );
    }
}