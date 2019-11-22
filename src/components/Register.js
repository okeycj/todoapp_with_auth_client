import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Register extends Component {
	constructor(props) {
		super(props); 

		this.state = {
			name: '',
			email: '',
			password: '',
			error: false
		}
	}
	
	change(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submit(e) {
		e.preventDefault();
		axios.post('https://todoappauthenticationcj.herokuapp.com/register', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(res => {
			localStorage.setItem('token', res.data.token);
			this.props.history.push('/todos');
		}).catch(err => this.setState({ error: err.response.data }))
	}
	render() {
		return (
			<form className="form-signin text-center col-6" style={{ margin: "200px auto",  }} onSubmit={e => this.submit(e)}>
			  { this.state.error 
			  	? <div className="alert alert-warning" role="alert">
					{ this.state.error }
				   </div>
				: ''
			  }
			  <h1 className="h3 mb-3 font-weight-normal">Please Register To Use The Todoapp</h1>
			  <label htmlFor="inputName" className="sr-only">Name</label>
			  <input type="text" name='name' id="inputName" className="form-control" placeholder="Input You Name" onChange={e => this.change(e)} value={this.state.name}/>
			  <label htmlFor="inputEmail" className="sr-only">Email address</label>
			  <input type="email" name='email' id="inputEmail" className="form-control" placeholder="Email address" onChange={e => this.change(e)} value={this.state.email}/>
			  <label htmlFor="inputPassword" className="sr-only">Password</label>
			  <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => this.change(e)} value={this.state.password}/>
			  <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			  <p className="mt-5 mb-3 text-muted">Already have an account, <Link to="/">Click Here</Link></p>
			</form>
		)
	}
}

export default Register;