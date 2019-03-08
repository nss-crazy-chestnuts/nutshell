import React, { Component } from "react";


export default class EventForm extends Component {
    // Set initial state
    state = {
        userId: sessionStorage.getItem("credentials"),
        eventName: "",
        eventLocation: "",
        eventDate: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewEvent = evt => {
        evt.preventDefault();

        const event = {
            userId: this.state.userId,
            eventName: this.state.eventName,
            eventLocation: this.state.eventLocation,
            eventDate: this.state.eventDate
        };

        this.props
            .addEvent(event)
            .then(() => this.props.history.push("/events"));
    };

    render() {
        return (
            <React.Fragment>
                <form className="eventForm">
                    <div className="form-group">
                        <label htmlFor="eventName">Event name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventName"
                            placeholder="Event name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Event Location</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            placeholder="Event Location"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="employee">Event Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventDate"
                            placeholder="Event date"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewEvent}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}