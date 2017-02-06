import React from 'react';
import { render } from 'react-dom';
import Input from 'components/input';
import CreateTodo from 'components/create_todo';

export default class App extends React.Component{

render(){
  return(
    <div>
      <div className="header"><h1>Hot Tamales</h1></div>
      <Input />
      <CreateTodo />
      <CreateTodo />
    </div>
  )
}
}
