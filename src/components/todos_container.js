import React from 'react';

export default class todos_container extends React.Component{
  constructor(props) {
    super(props)
    this.idsToInputs = {}
  }
  render(){

    let allTodos = this.props.todos

    return(
      <div>
        {allTodos.map((task, index) => <div key={index.toString()}>
          <input className='taskInputs' ref={input => this.idsToInputs[task.id] = input} defaultValue={task.task} />
          <button onClick={this.onDelete.bind(this, task.id)}>delete</button>
          <button onClick={this.onSave.bind(this, task.id)}>save</button>
          </div>)}
      </div>
    )
  }
  onDelete(id, e) {
    fetch('http://localhost:3000/api/ts_todo_db', {
      body: `id=${id}`,
      method: 'DELETE' ,
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    }).then(response => {
      this.props.onDeleteTask(id)
    })
  }
  onSave(id, e) {
    const task = this.idsToInputs[id].value
    fetch('http://localhost:3000/api/ts_todo_db', {
      body: `id=${id}&task=${task}`,
      method: 'PUT' ,
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    }).then(response => {
      this.props.onSaveTask(id, task)
    })
  }
}
