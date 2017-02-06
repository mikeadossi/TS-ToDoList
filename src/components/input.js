import React from 'react';
import { render } from 'react-dom';

export default class input extends React.Component{
  render(){
    return(
      <div>
      <input type="text" placeholder="create task"></input>
        <button>Add Task</button>
      </div>
    )
  }
}
