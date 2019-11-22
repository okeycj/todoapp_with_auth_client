import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Todolist from './Todolist';
import getJwt from '../helpers/jwt';
import AddTodo from './AddTodo';
// import uuid from 'uuid';

import '../helpers/Todos.css';
import axios from 'axios';

class Todos extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/');
    }

    axios.get('https://todoappauthenticationcj.herokuapp.com/todolist', { headers : { Authorization: `Bearer ${jwt}` } }).then(res => this.setState({
      todos: res.data
    })).catch(err => {
      localStorage.removeItem('token');
      this.props.history.push('/');
    })
  }

  markComplete = (id) => {
    const jwt = getJwt();
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        axios.put(`https://todoappauthenticationcj.herokuapp.com/updatetodo/${id}`, { 
          id, 
          completed: todo.completed 
        }, { 
          headers : { 
            Authorization: `Bearer ${jwt}` 
          } }).catch(err => {
            // console.log(err)
          localStorage.removeItem('token');
          this.props.history.push('/');
        })
      }
      return todo
    }) })
  }

  delTodo = (id) => {
    const jwt = getJwt();
    axios.delete(`https://todoappauthenticationcj.herokuapp.com/deltodo/${id}`, { headers : { Authorization: `Bearer ${jwt}` } })
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));        
  }

  addTodo = (title) => {
    const jwt = getJwt();
    axios.post('https://todoappauthenticationcj.herokuapp.com/addtodo', {
      title,
      completed: 'false'
    }, { 
      headers : { 
        Authorization: `Bearer ${jwt}` 
      } })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    return(
        <div>
          <Header logout={this.logout}/>
          <AddTodo addTodo={this.addTodo}/>
          {this.state.todos.length == 0
            ? <div className="text-center">
                Your Todolist Is Empty
              </div>
            : <Todolist todos={this.state.todos} delTodo={this.delTodo} markComplete={this.markComplete} />
          }
        </div>
    )
  }
}

export default Todos;
