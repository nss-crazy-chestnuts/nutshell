import React, { Component } from "react";

export default class ChatAddForm extends Component {
    // Set initial state
    state = {
        messageText: "",
        userId: "",
        timestamp: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewChat = evt => {
        evt.preventDefault();
        if (this.state.chat === "") {
            window.alert("Please enter a message");
        } else {
            const chatObject = {
                messageText: this.state.messageText,
                userId: this.props.activeUser.id,
                timestamp: parseInt(Date.now())
            };

            this.props
                .addChat(chatObject)
                .then(() => this.props.history.push("/chat"));
        }
    };

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
                            placeholder="Message"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewChat}
                        className="chatSaveAddButton"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}