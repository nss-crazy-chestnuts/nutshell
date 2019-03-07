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
                    this.props.news.map(news =>
                        <div key={news.id}>
                            <NewsItem news={news}
                                // sendHomeAnimal={this.props.sendHomeAnimal}
                                history={this.props.history}
                            />
                        </div>
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}