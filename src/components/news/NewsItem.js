import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class NewsItem extends Component {
    render() {
        return (
            <React.Fragment>
                <div key={this.props.news.id} className="newsItem">
                    <div className="card-body">
                        <h4 className="news--title">{this.props.news.news}</h4>
                            {this.props.news.date}<br />
                            {this.props.news.newsSynopsis}<br />
                            Posted By: {this.props.news.user.username}
                        {/* <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link> */}
                        {/* <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/news/${this.props.news.id}/edit`)
                            }}
                            >Edit</button> */}
                        {/* <button
                            onClick={() => this.props.sendHomeAnimal(this.props.animal.id)
                                .then(() => this.props.history.push("/animals"))}
                                className="card-link"
                                >Delete</button> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}