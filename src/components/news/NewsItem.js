import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        return (
            <React.Fragment>
                <div key={this.props.news.id} className="newsItem">
                    <div className={`card-body card ${(this.props.news.userId != sessionStorage.getItem("credentials")) ? "friendItem " : ""}`}>
                        <h4 className="news--title">{this.props.news.news}</h4>
                            {this.props.news.date}<br />
                            {this.props.news.newsSynopsis}<br />
                            <a href={`${this.props.news.newsURL}`}>Read Article</a><br />
                            Posted By: {this.props.news.user.username}
                            {
                                (this.props.news.userId === parseInt(sessionStorage.getItem("credentials"))) ? (
                                    <div><button
                            type="button"
                            className="btn btn-success newsButton"
                            onClick={() => {
                                this.props.history.push(`/news/${this.props.news.id}/edit`)
                            }}
                            >Edit</button>
                        <button
                            onClick={() => this.props.deleteNews(this.props.news.id)
                                .then(() => this.props.history.push("/news"))}
                                className="btn btn-success newsButton"
                            >Delete</button></div>) : ("")
                            }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}