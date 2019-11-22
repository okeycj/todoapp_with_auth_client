import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Header({ logout }) {
	return (
		<header style={headerStyle}>
			<h1>TodoList</h1>
			<a href="#" style={linkStyle} onClick={e => logout(e)}>Logout</a>
		</header>
	)
}
const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '10px'
}

const linkStyle = {
	color: '#fff',
	textDecoration: 'none'
}

export default Header