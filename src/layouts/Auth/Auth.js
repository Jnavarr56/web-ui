import React, { Fragment, Suspense, useContext } from 'react'
import { renderRoutes } from 'react-router-config'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { LinearProgress } from '@material-ui/core'
import { Topbar } from './components'
import { context as AuthContext } from 'authentication'

const useStyles = makeStyles(theme => ({
	content: {
		height: '100%',
		paddingTop: 56,
		[theme.breakpoints.up('sm')]: {
			paddingTop: 64
		}
	}
}))

const Auth = props => {
	const { route } = props

	const classes = useStyles()

	const { session } = useContext(AuthContext)

	if (session) return <Redirect to="/dashboard" />

	return (
		<Fragment>
			<Topbar />
			<main className={classes.content}>
				<Suspense fallback={<LinearProgress />}>
					{renderRoutes(route.routes)}
				</Suspense>
			</main>
		</Fragment>
	)
}

Auth.propTypes = {
	route: PropTypes.object
}

export default Auth
