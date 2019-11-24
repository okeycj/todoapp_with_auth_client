import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getJwt from '../helpers/jwt';
import axios from 'axios'

class Login extends Component {
	constructor(props) {
		super(props); 

		this.state = {
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

	componentDidMount() {
		const jwt = getJwt();
		if (jwt) {
			this.props.history.push('/todos');
		}
	}

	submit(e) {
		e.preventDefault();
		e.preventDefault();
		var btn = document.getElementById('btn')
		btn.disabled = true;
		btn.innerHTML = 'Loading...'
		axios.post('https://todoappauthenticationcj.herokuapp.com/signin', {
			email: this.state.email,
			password: this.state.password
		}).then(res => {
			localStorage.setItem('token', res.data.token);
			this.props.history.push('/todos');
		}).catch(err => {
			btn.disabled = false;
			btn.innerHTML = 'Sign in'
			this.setState({ error: err.response.data })
		})
	}
	render() {
		return (
				<form className="form-signin text-center col-lg-6 col-md-6 col-sm-12" style={{ margin: "200px auto",  }} onSubmit={e => this.submit(e)}>
				  { this.state.error 
				  	? <div className="alert alert-warning" role="alert">
						{ this.state.error }
					   </div>
					: ''
				  }
				  <h1 className="h3 mb-3 font-weight-normal">Please Signin</h1>
				  <label htmlFor="inputEmail" className="sr-only">Email address</label>
				  <input type="email" name='email' id="inputEmail" className="form-control" placeholder="Email address" onChange={e => this.change(e)} value={this.state.email}/>
				  <label htmlFor="inputPassword" className="sr-only">Password</label>
				  <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => this.change(e)} value={this.state.password}/>
				  <button className="btn btn-lg btn-primary btn-block" id='btn' type="submit">Sign in</button>
				  <p className="mt-5 mb-3 text-muted">Register an account, <Link to="/register">Click Here</Link></p>
				</form>
		)
	}
}

export default Login;