import React, { Component } from "react"
import NewsManager from "../../modules/NewsManager"

export default class NewsEditForm extends Component {
    // Set initial state
    state = {
        userId: "",
        newsURL: "",
        news: "",
        newsSynopsis: "",
        date: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingNews = evt => {
      evt.preventDefault()

        const editedNews = {
          id: this.props.match.params.newsId,
          newsURL: this.state.newsURL,
          news: this.state.news,
          newsSynopsis: this.state.newsSynopsis,
          date: this.state.date,
          userId: parseInt(this.props.activeUser.id)
        }

        this.props.updateNews(editedNews)
        .then(() => this.props.history.push("/news"))
        }

    componentDidMount() {
      NewsManager.get(`news/${this.props.match.params.newsId}`)
      .then(news => {
        this.setState({
            newsURL: news.newsURL,
            news: news.news,
            newsSynopsis: news.newsSynopsis,
            date: news.date,
            userId: news.userId
        })
      })
    }


    render() {
      return (
        <React.Fragment>
          <form className="newsForm">
          <div className="form-group">
            <label htmlFor="newsHeadline">News</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="news"
              value={this.state.news}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newsSynopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="newsSynopsis"
              value={this.state.newsSynopsis}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newsURL">Link</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="newsURL"
              value={this.state.newsURL}
            />
          </div>

            <button
              type="submit"
              onClick={this.updateExistingNews}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}