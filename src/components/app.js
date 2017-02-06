import React from 'react';
import Header from 'components/header';
import CreateTodo from 'components/create_todo';
import TodosContainer from 'components/todos_container';

export default class App extends React.Component{
constructor(props) {
  super(props)
  this.state = {
    todosData: [],
  }
}
  componentDidMount() {
    this.getTodos()
  }
  getTodos() {
    fetch( 'http://localhost:3000/api/ts_todo_db', { method:
      'get'} ).then( response =>
        response.json()).then( results => this.setState({
          todosData: results.data.map(task => ({ task: task.task, id: task.id})) // note we only want the data which is an array
        })
      )
  }
  render(){

    return(
      <div>
        <Header />
        <CreateTodo onAddTask={this.onAddTask.bind(this)} />
        <TodosContainer todos={this.state.todosData} onDeleteTask={this.onDeleteTask.bind(this)} onSaveTask={this.onSaveTask.bind(this)} />
      </div>
    )
  }
  onAddTask(task) {
    this.setState({
      todosData: this.state.todosData.concat([task])
    })
  }
  onDeleteTask(id) {
    this.setState({
      todosData: this.state.todosData.filter(task => task.id !== id)
    })
  }
  onSaveTask(id, newTask) {
    this.setState({
      todosData: this.state.todosData.map(task => task.id === id ? { id: id, task: newTask } : task)
    })
  }

}
