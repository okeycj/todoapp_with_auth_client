import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthenticatedComponent from './AuthenticatedComponent';
import Todos from './Todos';
import Register from './Register';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
		    	<Switch>
		    		<Route path="/" exact component={Login} />
		    		<Route path="/register" exact component={Register} />
		    		<AuthenticatedComponent>
			    		<Route path="/todos" exact component={Todos} />
		    		</AuthenticatedComponent>
		    	</Switch>
		    </BrowserRouter>
		)
	}
}

export default App;
