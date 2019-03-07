import React, { Component } from "react"

export default class NewsForm extends Component {
  // Set initial state
  state = {
    news: "",
    newsSynopsis: "",
    date: "",
    newsHTML: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange)
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewNews = evt => {
    evt.preventDefault()
      const news = {
        userId: parseInt(this.props.activeUser.id),
        news: this.state.newsHeadline,
        newsSynopsis: this.state.newsSynopsis,
        date: Date().split(" ").splice(0, 4).join(" "),
        newsHTML: this.state.newsHTML
      }

      // Create the animal and redirect user to animal list
      this.props
        .addNews(news)
        .then(() => this.props.history.push("/news"))
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
              id="newsHeadline"
              placeholder="Headline"
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
              placeholder="Synopsis"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newsHTML">Link</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="newsHTHM"
              placeholder="http://www.example.com"
            />
          </div>

          <button
            type="submit"
            onClick={this.constructNewNews}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}