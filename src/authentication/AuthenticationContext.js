import React, { useState, useEffect, useMemo } from 'react'
import { CircularProgress, Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { context as AuthContext } from 'authentication'

const useStyles = makeStyles(theme => ({
	loadingDialog: {
		'& *.MuiDialog-container': {
			backgroundColor: 'white'
		},
		'& *.MuiDialog-paper': {
			backgroundColor: 'transparent',
			padding: theme.spacing(4),
			boxShadow: theme.shadows[0]
		}
	}
}))
const AuthenticationContext = props => {
	const { children } = props

	const { search, pathname } = useLocation()
	const history = useHistory()

	const classes = useStyles()
	const [ fetching, setFetching ] = useState(true)
	const [ session, setSession ] = useState(null)

	const authContext = useMemo(
		() => ({
			setSession,
			session
		}),
		[ session ]
	)

	useEffect(() => {
		if (pathname === '/auth/callback') {
			axios
				.get(`http://localhost:4000/authentication/callback${search}`)
				.then(({ data }) => {
					const { token_data, ...sessionData } = data
					jsCookie.set('speeterfoo', token_data.access_token)
					setSession(sessionData)
				})
				.catch(error => {
					const { response } = error
					history.push(`/errors/error-${(response && response.status) || 500}`)
				})
				.finally(() => setFetching(false))
		} else {
			const authCookie = jsCookie.get('speeterfoo')

			if (authCookie) {
				const config = {
					headers: {
						Authorization: `Bearer ${authCookie}`
					}
				}
				axios
					.get('http://localhost:4000/authentication/re-authorize', config)
					.then(({ data }) => {
						const { token_data, ...sessionData } = data
						if (token_data) {
							jsCookie.set('speeterfoo', token_data.access_token)
						}
						setSession(sessionData)
					})
					.catch(error => {
						jsCookie.remove('speeterfoo')

						const { response } = error
						if (response && response.status !== 401) {
							history.push(`/errors/error-${response.status}`)
						}
					})
					.finally(() => setFetching(false))
			} else {
				setFetching(false)
			}
		}
	}, [ search, pathname, history ])

	if (fetching) {
		return (
			<Dialog
				className={classes.loadingDialog}
				open
			>
				<CircularProgress size={48} />
			</Dialog>
		)
	}

	return (
		<AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
	)
}

export default AuthenticationContext
