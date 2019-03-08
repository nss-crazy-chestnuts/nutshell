import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./event.css"


class EventsList extends Component {

    render() {
        let flag = true;
        return (
            <React.Fragment>
                {<div className="eventButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/events/new")
                        }
                        }>
                        Add Event
            </button>
                </div>

                /*<section className="animals"> */}
                <h1>Events List</h1>
                {
                    this.props.events.filter(function (event) {
                        if (new Date(event.eventDate) > new Date()) {
                            return event
                        }
                    }).sort(function (eventA, eventB) {
                        return new Date(eventA.eventDate) - new Date(eventB.eventDate);
                    }).map(event =>

                        <div key={event.id} className={`card ${(event.userId != sessionStorage.getItem("credentials")) ? "friendItem " : ""}${flag ? "firstEvent" : ""}`}>
                            {flag = false}
                            <div className="card-body">
                                <h5 className="card-title">
                                    User: {event.user.username}
                                    <div>
                                        Event: {event.eventName}
                                    </div>
                                    <div>
                                        Location: {event.eventLocation}
                                    </div>
                                     <div>
                                                    Date: {event.eventDate}
                                                </div>
                                    {
                                        (event.userId === sessionStorage.getItem("credentials")) ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() => {
                                                        this.props.history.push(`/events/${event.id}/edit`);
                                                    }}
                                                >
                                                    Edit
                                                 </button>

                                                <a href="#"
                                                    onClick={() => this.props.deleteEvent(event.id)}
                                                    className="card-link">Delete</a>
                                            </>
                                        ) : ("")
                                    }
                                </h5>
                            </div>
                        </div>
                    )
                }
                {/* </section> */}
            </React.Fragment>
        );
    }
}


export default EventsList