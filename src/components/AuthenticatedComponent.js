import React, { Component } from 'react';
import getJwt from '../helpers/jwt';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AuthenticationComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: undefined
		};
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


	render() {
		if (this.state.todos === undefined) {
			return (
				<div>
					Loading.....
				</div>
			)
		}
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default withRouter(AuthenticationComponent);