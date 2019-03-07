import React, { Component } from "react"
import API from "../../modules/EventManager"

export default class EventEditForm extends Component {

  state = {
    userId: "",
    eventName: "",
    eventLocation: "",
    eventDate: ""
  };
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEvent = evt => {
      evt.preventDefault()


        const editedEvent = {
          id: this.props.match.params.eventId,
          userId: this.state.userId,
          eventName: this.state.eventName,
          eventLocation: this.state.eventLocation,
          eventDate: this.state.eventDate
        };

    this.props.updateEvent(editedEvent)
    .then(() => {
      console.log("2")
      this.props.history.push("/events")})

  }

    componentDidMount() {


      API.GET(`events/${this.props.match.params.eventId}`)
      .then(event => {
        this.setState({
          userId: sessionStorage.getItem("credentials"),
          eventName: event.eventName,
          eventLocation: event.eventLocation,
          eventDate: event.eventDate
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="EventForm">
            <div className="form-group">
              <label htmlFor="eventName">EventForm name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="eventName"
                value = {this.state.eventName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventLocation">Event Location</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="eventLocation"
                value = {this.state.eventLocation}
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
                            value= {this.state.eventDate}
                        />
            </div>
            <button
              type="submit"
              onClick={this.updateExistingEvent}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}