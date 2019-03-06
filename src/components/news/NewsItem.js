import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class NewsItem extends Component {
    render() {
        return (
            <React.Fragment>
                <div key={this.props.news.id} className="newsItem">
                    <div className="card-body">
                        <h3 className="news--title">{this.props.news.news}</h3>
                            {this.props.news.date}<br />
                            {this.props.news.newsSynopsis}
                        {/* <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link> */}
                        {/* <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/animals/${this.props.animal.id}/edit`)
                            }}
                            >Edit</button>
                        <button
                            onClick={() => this.props.sendHomeAnimal(this.props.animal.id)
                                .then(() => this.props.history.push("/animals"))}
                                className="card-link">Delete</button> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}