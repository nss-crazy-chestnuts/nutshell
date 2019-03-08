import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class NewsList extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>News</h1>
                <div className="newsButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/news/new")}
                            }>
                        Add News Item
                    </button>
                </div>
                <section className="newsSection">
                {
                    this.props.news.sort(function (newsA, newsB) {
                        return new Date(newsB.date) - new Date(newsA.date)})
                        .map(news =>
                        <div key={news.id}>
                            <NewsItem news={news}
                                history={this.props.history}
                                deleteNews={this.props.deleteNews}
                            />
                        </div>
                    )
                }
            }
                </section>
            </React.Fragment>
        )
    }
}