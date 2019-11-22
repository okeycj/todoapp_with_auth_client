const getJwt = () => {
	return localStorage.getItem('token');
}

export default getJwt;