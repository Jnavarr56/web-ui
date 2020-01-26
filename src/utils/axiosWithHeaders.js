import axios from 'axios'
import jsCookie from 'js-cookie'

// use env vars when env source configured
// const { REACT_APP_AUTH_COOKIE: AUTH_COOKIE } = process.env

const axiosWithHeaders = () => {
	const accessToken = jsCookie.get('speeterfoo')

	if (accessToken) {
		return axios.create({
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	}

	return axios
}

export default axiosWithHeaders
