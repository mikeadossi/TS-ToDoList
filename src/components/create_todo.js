import React from 'react';

export default class create_todo extends React.Component{

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);

  }

  render(){
    return(
      <form ref={form => this.form = form} onSubmit={this.addTodo}>
        <table>
          <tbody>
            <tr>
              <td><input placeholder='create task' name='task'></input></td>
              <td><button>Add Task</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
  addTodo(e) {
    e.preventDefault()
    const task = this.form.task.value

    fetch('http://localhost:3000/api/ts_todo_db', {
      body: `task=${task}&is_complete=false`,
      method: 'POST' ,
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    }).then(response => {

      response.json().then(response => this.props.onAddTask({ task: task, id: response.id }))
    })
  }

}
