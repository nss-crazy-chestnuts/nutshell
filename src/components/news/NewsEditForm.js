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

    //   if (this.state.employee === "") {
    //     window.alert("Please select a caretaker");
    //   } else {
        const editedNews = {
          id: this.props.match.params.newsId,
          newsURL: this.state.newsURL,
          news: this.state.news,
          newsSynopsis: this.state.newsSynopsis
        // }

        this.props.updateNews(editedNews)
        .then(() => this.props.history.push("/news"))
        }
    }

    componentDidMount() {
      NewsManager.get(this.props.match.params.newsId)
      .then(news => {
        this.setState({
            newsURL: news.newsURL,
            news: news.news,
            newsSynopsis: news.newsSynopsis
        })
      })
    }


    render() {
      return (
        <React.Fragment>
          <form className="animalEditForm">
            <div className="form-group">
              <label htmlFor="animalName">Animal name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="animalName"
                value = {this.state.animalName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="type"
                value = {this.state.type}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee">Assign to caretaker</label>
              <select
                name="employee"
                id="employeeId"
                onChange={this.handleFieldChange}
                value = {this.state.employeeId}
              >
                <option value="">Select an employee</option>
                {this.props.employees.map(e => (
                  <option key={e.id} id={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={this.updateExistingAnimal}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}