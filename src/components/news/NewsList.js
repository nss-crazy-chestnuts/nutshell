import React, { Component } from 'react'
import NewsItem from './NewsItem'

// use session storage later
// const userId = 1


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
                            <NewsItem news={news}
                                // sendHomeAnimal={this.props.sendHomeAnimal}
                                history={this.props.history}
                            />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}





// .then(newsArray => {
//     // Sort news by date
//     let sortedNewsArray = newsArray.sort((a, b) => {
//         return new Date(b.date) - new Date(a.date)
//     })
//     return sortedNewsArray