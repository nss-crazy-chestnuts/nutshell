import React, { Component } from "react"
import TaskCard from "./TaskCard";


export default class TaskList extends Component {
    render () {
        return (
            <React.Fragment>
                <h1>Tasks</h1>
                <section className="taskList_Container">
                {
                    this.props.tasks.map(task =>
                           <TaskCard key={task.id} task={task} {...this.props} />
                    )
                }
                    </section>
            </React.Fragment>
        )
    }
}