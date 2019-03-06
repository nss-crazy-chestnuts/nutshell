import React, { Component } from 'react'
import NewsItem from './NewsItem'

// use session storage later
const userId = 3



export default class NewsList extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>News</h1>
                {/* <div className="animalButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/animals/new")}
                            }>
                        Admit Animal
                    </button>
                </div> */}
                <section className="newsSection">
                {
                    this.props.news.map(news =>
                        <div className="newsCard" key={news.id}>
                            <NewsItem news={news}
                                // sendHomeAnimal={this.props.sendHomeAnimal}
                                // history={this.props.history}
                            />
                        </div>
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}